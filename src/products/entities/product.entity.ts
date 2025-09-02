import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'T-Shirt Teslo',
    description: 'Product Title',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;
  @ApiProperty({
    example: 0,
    description: 'Product Price',
    default: 0,
  })
  @Column('float', { default: 0 })
  price: number;
  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Product Description',
  })
  @Column({ type: 'text', nullable: true })
  description: string;
  @ApiProperty({
    example: 't_shirt_teslo',
    description: 'Product Slug - for SEO',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  slug: string;
  @ApiProperty({
    example: 10,
    description: 'Product Stock',
    default: 0,
  })
  @Column('int', { default: 0 })
  stock: number;
  @ApiProperty({
    example: ['S', 'M', 'L', 'XL'],
    description: 'Product Sizes',
  })
  @Column('text', { array: true })
  sizes: string[];
  @ApiProperty({
    example: 'woman',
    description: 'Product Gender',
  })
  @Column('text')
  gender: string;
  @ApiProperty()
  @Column('text', { array: true, default: [] })
  tags: string[];

  // Images
  @ApiProperty()
  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.product,
    { cascade: true, eager: true }, // cascade: true allows saving images with the product
  )
  images?: ProductImage[];

  @ManyToOne(
    () => User,
    (user) => user.product, // Assuming a user can have multiple products
    { eager: true },
  )
  user: User;

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
