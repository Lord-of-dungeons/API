import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentType } from "./EquipmentType";
import { MonsterType } from "./MonsterType";
import { _Object } from "./Object";
import { ObjectType } from "./ObjectType";
import { VocationType } from "./VocationType";

@Entity("type", { schema: "lord_of_dungeons" })
export class Type {
  @PrimaryGeneratedColumn({ type: "int", name: "id_type" })
  idType: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => EquipmentType, equipmentType => equipmentType.type)
  equipmentTypes: EquipmentType[];

  @OneToMany(() => MonsterType, monsterType => monsterType.type)
  monsterTypes: MonsterType[];

  @OneToMany(() => _Object, _object => _object.type)
  Objects: Object[];

  @OneToMany(() => ObjectType, ObjectType => ObjectType.type)
  ObjectTypes: ObjectType[];

  @OneToMany(() => VocationType, vocationType => vocationType.type)
  vocationTypes: VocationType[];
}
