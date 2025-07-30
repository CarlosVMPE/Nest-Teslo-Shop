import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './';

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('text')
  url: string;
  @ManyToOne(
    () => Product,
    (product) => product.images,
    { onDelete: 'CASCADE' }, // If the product is deleted, the images will also be deleted
  )
  product: Product;
}
