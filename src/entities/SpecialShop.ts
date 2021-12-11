import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("special_shop", { schema: "lord_of_dungeons" })
export class SpecialShop {
  @PrimaryGeneratedColumn({ type: "int", name: "id_special_shop" })
  idSpecialShop: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("double", { name: "price", precision: 22, default: () => "'0'" })
  price: number;

  @Column("datetime", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("datetime", {
    name: "date_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("int", { name: "promo", default: () => "'0'" })
  promo: number;
}
