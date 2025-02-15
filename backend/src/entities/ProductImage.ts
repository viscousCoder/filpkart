import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductDetails } from "./ProductDetails";

/**For creating product image table */
@Entity("product_images")
export class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  image: string;

  @Column("varchar")
  image_id: string;

  @ManyToOne(() => ProductDetails, (productDetails) => productDetails.images, {
    onDelete: "CASCADE",
  })
  productDetails: ProductDetails;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
