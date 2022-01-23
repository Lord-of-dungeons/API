import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CombatPhaseSpecialFeature } from "./CombatPhaseSpecialFeature";
import { Equipment } from "./Equipment";
import { Power } from "./Power";

@Entity("special_feature", { schema: "lord_of_dungeons" })
export class SpecialFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "id_special_feature" })
  idSpecialFeature: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

  @Column("double", {
    name: "probability",
    precision: 22,
    default: () => "'0'",
  })
  probability: number;

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

  @Column("double", { name: "base", precision: 22, default: () => "'1'" })
  base: number;

  @Column("int", { name: "duration", default: () => "'0'" })
  duration: number;

  @Column("double", { name: "coeff", precision: 22, default: () => "'1'" })
  coeff: number;

  @OneToMany(() => CombatPhaseSpecialFeature, combatPhaseSpecialFeature => combatPhaseSpecialFeature.specialFeature)
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];

  @OneToMany(() => Equipment, equipment => equipment.specialFeature)
  equipment: Equipment[];

  @OneToMany(() => Power, power => power.specialFeature)
  powers: Power[];
}
