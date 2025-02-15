import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { ProductDetails } from "./ProductDetails";

export enum OrderStatus {
  CART = "CART",
  ORDERED = "ORDERED",
  WISHLIST = "WISHLIST",
}

/**For creating user order table */
@Entity("user_orders")
export class UserOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => ProductDetails, (product) => product.orders, {
    eager: true,
    onDelete: "CASCADE",
  })
  product: ProductDetails;

  @Column({ type: "int", default: 1 })
  quantity: number;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.CART })
  status: OrderStatus;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
