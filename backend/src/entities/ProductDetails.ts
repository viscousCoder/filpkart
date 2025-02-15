import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductImage } from "./ProductImage";
import { Subtitle } from "./Subtitle";
import { UserOrder } from "./UserOrder";

/**For creating product details table */
@Entity("product_details")
export class ProductDetails {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @OneToMany(() => Subtitle, (subtitle) => subtitle.product, {
    cascade: true,
    eager: true,
  })
  subtitles: Subtitle[];

  @Column("varchar")
  outer_image: string;

  @Column("varchar")
  outer_image_id: string;

  @OneToMany(
    () => ProductImage,
    (productImage) => productImage.productDetails,
    {
      cascade: true,
      eager: true,
    }
  )
  images: ProductImage[];

  @Column("float")
  price: number;

  @Column("float")
  rating: number;

  @Column("varchar", { default: "No overview available" })
  overview: string;

  @Column("varchar")
  company_name: string;

  @Column("varchar")
  category: string;

  @Column("varchar")
  subcategory: string;

  @Column("int")
  quantity: number;

  @Column("int")
  discount: number;

  @OneToMany(() => UserOrder, (order) => order.product)
  orders: UserOrder[];

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
