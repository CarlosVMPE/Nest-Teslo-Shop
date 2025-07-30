import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule], // Export ProductsService if needed in other modules
  imports: [TypeOrmModule.forFeature([Product, ProductImage])], // Add your entities here, e.g., Product
})
export class ProductsModule {}
