import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Inventory } from "./Inventory";
import { _Object } from "./Object";

@Index("fk_inventory_Object_inventory1_idx", ["idInventory"], {})
@Index("fk_inventory_Object_Object1_idx", ["idObject"], {})
@Entity("inventory_object", { schema: "lord_of_dungeons" })
export class InventoryObject {
  @PrimaryColumn("int", { name: "id_inventory" })
  idInventory: number;

  @Column("int", { name: "id_object" })
  idObject: number;

  @ManyToOne(() => Inventory, inventory => inventory.inventoryObjects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_inventory", referencedColumnName: "idInventory" }])
  inventory: Inventory;

  @ManyToOne(() => _Object, _object => _object.inventoryObjects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_object", referencedColumnName: "idObject" }])
  _object: Object;
}
