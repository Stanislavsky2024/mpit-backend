import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guard/auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard));
}
