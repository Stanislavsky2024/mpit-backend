import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/categories')
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Get('/subcategories')
  @HttpCode(HttpStatus.OK)
  async getSubcategories() {
    return await this.categoriesService.getSubcategories();
  }

  @Get('/subcategories/:name')
  @HttpCode(HttpStatus.OK)
  async getSubcategoriesByCategory(@Param('name') name: string) {
    return await this.categoriesService.getSubcategoriesByCategory(name);
  }
}
