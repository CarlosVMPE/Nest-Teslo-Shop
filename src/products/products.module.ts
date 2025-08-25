import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, ProductImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, TypeOrmModule], // Export ProductsService if needed in other modules
  imports: [TypeOrmModule.forFeature([Product, ProductImage]), AuthModule], // Add your entities here, e.g., Product
})
export class ProductsModule {}
