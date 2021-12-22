import { Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Index("zip_code_idx", ["zipCode"], {})
@Index("city_idx", ["city"], {})
@Entity("address", { schema: "lord_of_dungeons" })
export class Address {
  @PrimaryGeneratedColumn({ type: "int", name: "id_address" })
  idAddress: number;

  @Column("varchar", { name: "city", length: 100 })
  city: string;

  @Column("varchar", { name: "zip_code", length: 5 })
  zipCode: string;

  @Column("int", { name: "num_address" })
  numAddress: number;

  @Column("varchar", { name: "street", length: 255 })
  street: string;

  @Column("varchar", {
    name: "country",
    nullable: true,
    length: 45,
    default: () => "'France'",
  })
  country: string | null;

  @OneToOne(() => User, user => user.address, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  user: User;
}
