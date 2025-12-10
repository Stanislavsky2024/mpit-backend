import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.util';

@Injectable()
export class AuthService {
  private readonly COOKIE_DOMAIN: string;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return accessToken;
  }

  private generateTokens(id: string) {
    const jwtPayload: IJwtPayload = { id };

    const accessToken = this.jwtService.sign(jwtPayload, {
      expiresIn: '10m',
    });

    const refreshToken = this.jwtService.sign(jwtPayload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expirationDate: Date) {
    return res.cookie('refreshToken', value, {
      expires: expirationDate,
      secure: !isDev(this.configService),
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'] as string;

    if (!refreshToken) {
      throw new UnauthorizedException('Token expired');
    }

    const payload: IJwtPayload = this.jwtService.verify(refreshToken);
    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.auth(res, user.id);
    }
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));

    return true;
  }

  async register(res: Response, dto: RegisterDto) {
    const { email, password, username } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: await hash(password),
        username,
        role: 'CUSTOMER',
      },
    });

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await verify(user.password, password))) {
      throw new NotFoundException('User not found');
    }

    return this.auth(res, user.id);
  }
}
