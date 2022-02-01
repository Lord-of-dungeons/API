import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";
import { InventoryLevel } from "./InventoryLevel";
import { InventoryEquipment } from "./InventoryEquipment";
import { InventoryObject } from "./InventoryObject";

@Index("fk_inventory_inventory_level1_idx", ["idInventoryLevel"], {})
@Index("fk_inventory_character1_idx", ["idCharacter"], {})
@Entity("inventory", { schema: "lord_of_dungeons" })
export class Inventory {
  @PrimaryGeneratedColumn({ type: "int", name: "id_inventory" })
  idInventory: number;

  @Column("int", { name: "id_inventory_level" })
  idInventoryLevel: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @ManyToOne(() => Character, character => character.inventories, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  character: Character;

  @ManyToOne(() => InventoryLevel, inventoryLevel => inventoryLevel.inventories, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_inventory_level", referencedColumnName: "idInventoryLevel" }])
  inventoryLevel: InventoryLevel;

  @OneToMany(() => InventoryEquipment, inventoryEquipment => inventoryEquipment.inventory)
  inventoryEquipments: InventoryEquipment[];

  @OneToMany(() => InventoryObject, inventoryObject => inventoryObject.inventory)
  inventoryObjects: InventoryObject[];
}
