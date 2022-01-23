import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Equipment } from "./Equipment";
import { Inventory } from "./Inventory";

@Index("fk_inventory_equipment_inventory1_idx", ["idInventory"], {})
@Index("fk_inventory_equipment_equipment1_idx", ["idEquipment"], {})
@Entity("inventory_equipment", { schema: "lord_of_dungeons" })
export class InventoryEquipment {
  @PrimaryColumn("int", { name: "id_inventory" })
  idInventory: number;

  @Column("int", { name: "id_equipment" })
  idEquipment: number;

  @ManyToOne(() => Equipment, equipment => equipment.inventoryEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_equipment", referencedColumnName: "idEquipment" }])
  equipment: Equipment;

  @ManyToOne(() => Inventory, inventory => inventory.inventoryEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_inventory", referencedColumnName: "idInventory" }])
  inventory: Inventory;
}
