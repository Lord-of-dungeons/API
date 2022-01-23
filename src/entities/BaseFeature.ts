import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vocation } from "./Vocation";

@Entity("base_feature", { schema: "lord_of_dungeons" })
export class BaseFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "id_base_feature" })
  idBaseFeature: number;

  @Column("int", { name: "health" })
  health: number;

  @Column("int", { name: "mana" })
  mana: number;

  @Column("int", { name: "armor" })
  armor: number;

  @Column("int", { name: "attack" })
  attack: number;

  @Column("double", { name: "attack_speed", default: "0.00" })
  attackSpeed: number;

  @Column("double", { name: "critical", default: "0.00" })
  critical: number;

  @Column("double", { name: "wisdom", default: "0.00" })
  wisdom: number;

  @OneToMany(() => Vocation, vocation => vocation.baseFeature)
  vocation: Vocation;
}
