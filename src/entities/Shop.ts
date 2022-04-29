import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Index, JoinColumn, OneToMany, VersionColumn } from "typeorm";
import { Article } from "./Article";

import { Equipment } from "./Equipment";
import { VocationAppearance } from "./VocationAppearance";

@Entity("shop", { schema: "lord_of_dungeons" })

@Index("id_equipement", ["idEquipment"], {})
@Index("id_vocation_appearance", ["idVocationAppearance"], {})
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

  @VersionColumn()
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

  // ANCHOR Manual edit for category, id_equipment and id_vocation_appearance
  @Column("enum", {
    name: "category",
    enum: ["equipment", "vocation_appearance"],
  })
  category: "equipment" | "vocation_appearance";

  @Column("int", { name: "id_equipment" })
  idEquipment: number;

  @Column("int", { name: "id_vocation_appearance" })
  idVocationAppearance: number;

  @OneToOne(() => Equipment, Equipment => Equipment.idEquipment, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    cascade: true,
  })
  @JoinColumn([
    {
      name: "id_equipment",
      referencedColumnName: "idEquipment",
    },
  ])
  Equipment: Equipment;


  @OneToOne(() => VocationAppearance, vocationAppearance => vocationAppearance.vocation, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    cascade: true,
  })
  @JoinColumn([
    {
      name: "id_vocation_appearance",
      referencedColumnName: "idVocationAppearance",
    },
  ])
  vocationAppearance: VocationAppearance;
}
