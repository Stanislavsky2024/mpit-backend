import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/products')
  @HttpCode(HttpStatus.OK)
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('/products/subcategory/:name')
  @HttpCode(HttpStatus.OK)
  async getProductsBySubcategory(@Param('name') name: string) {
    return await this.productsService.getProductsBySubcategory(name);
  }

  @Get('/products/:id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(id);
  }
}
