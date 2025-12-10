import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategories() {
    return await this.prismaService.category.findMany();
  }

  async getSubcategories() {
    return await this.prismaService.subcategory.findMany();
  }

  async getSubcategoriesByCategory(name: string) {
    return await this.prismaService.subcategory.findMany({
      where: { categoryName: name },
    });
  }
}
