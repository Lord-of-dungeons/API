import { Column, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Article } from "./Article";

@Entity("shop", { schema: "lord_of_dungeons" })
export class Shop {
  @PrimaryGeneratedColumn({ type: "int", name: "id_shop" })
  idShop: number;

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

  @OneToMany(() => Article, article => article.shop, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  articles: Article[];
}
