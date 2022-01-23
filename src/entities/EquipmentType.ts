import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Equipment } from "./Equipment";
import { Type } from "./Type";

@Index("fk_equipment_type_equipment1_idx", ["idEquipment"], {})
@Index("fk_equipment_type_type1_idx", ["idType"], {})
@Entity("equipment_type", { schema: "lord_of_dungeons" })
export class EquipmentType {
  @PrimaryColumn("int", { name: "id_equipment" })
  idEquipment: number;

  @Column("int", { name: "id_type" })
  idType: number;

  @ManyToOne(() => Equipment, equipment => equipment.equipmentTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_equipment", referencedColumnName: "idEquipment" }])
  equipment: Equipment;

  @ManyToOne(() => Type, type => type.equipmentTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  idType2: Type;
}
