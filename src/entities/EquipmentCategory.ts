import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Equipment } from "./Equipment";

@Entity("equipment_category", { schema: "lord_of_dungeons" })
export class EquipmentCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id_equipment_category" })
  idEquipmentCategory: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => Equipment, equipment => equipment.equipmentCategory)
  equipment: Equipment[];
}
