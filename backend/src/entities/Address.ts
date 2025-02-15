import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

/**@class for creating user_address table */
@Entity("user_addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phonenumber: string;

  @Column({ nullable: false })
  pincode: string;

  @Column({ nullable: false })
  locality: string;

  @Column({ nullable: false })
  com_address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  state: string;

  @Column({ nullable: true })
  landmark: string;

  @Column({ nullable: true })
  alternate_phonenumber: string;

  @Column({ nullable: false })
  address_type: string;

  @Column({ default: true })
  isActiveAddress: boolean;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @BeforeInsert()
  async setActiveAddress() {
    this.isActiveAddress = true;
  }
}
