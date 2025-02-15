import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductDetails } from "./ProductDetails";

/**For creating subtitle table */
@Entity("sub_titles")
export class Subtitle {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  text: string;

  @ManyToOne(() => ProductDetails, (product) => product.subtitles, {
    onDelete: "CASCADE",
  })
  product: ProductDetails;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
