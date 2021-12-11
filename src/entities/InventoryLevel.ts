import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./Inventory";

@Entity("inventory_level", { schema: "lord_of_dungeons" })
export class InventoryLevel {
  @PrimaryGeneratedColumn({ type: "int", name: "id_inventory_level" })
  idInventoryLevel: number;

  @Column("int", { name: "level", default: () => "'1'" })
  level: number;

  @Column("int", { name: "item_max", default: () => "'1'" })
  itemMax: number;

  @OneToMany(() => Inventory, (inventory) => inventory.idInventoryLevel2)
  inventories: Inventory[];
}
