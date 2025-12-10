import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProducts() {
    return await this.prismaService.product.findMany();
  }

  async getProductsBySubcategory(name: string) {
    return await this.prismaService.product.findMany({
      where: { subcategoryName: name },
    });
  }

  async getProductById(id: string) {
    return await this.prismaService.product.findMany({
      where: { id },
    });
  }
}
