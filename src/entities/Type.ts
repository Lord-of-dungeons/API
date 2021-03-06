import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentType } from "./EquipmentType";
import { MonsterType } from "./MonsterType";
import { Objects } from "./Object";
import { ObjectType } from "./ObjectType";
import { VocationType } from "./VocationType";

@Entity("type", { schema: "lord_of_dungeons" })
export class Type {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type" })
  idType: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => EquipmentType, equipmentType => equipmentType.idType2)
  equipmentTypes: EquipmentType[];

  @OneToMany(() => MonsterType, monsterType => monsterType.idType2)
  monsterTypes: MonsterType[];

  @OneToMany(() => Objects, Object => Object.idType2)
  Objects: Object[];

  @OneToMany(() => ObjectType, ObjectType => ObjectType.idType2)
  ObjectTypes: ObjectType[];

  @OneToMany(() => VocationType, vocationType => vocationType.idType2)
  vocationTypes: VocationType[];
}
