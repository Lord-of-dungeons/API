import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CombatPhaseCharacter } from "./CombatPhaseCharacter";
import { CombatPhaseMonster } from "./CombatPhaseMonster";
import { CombatPhaseSpecialFeature } from "./CombatPhaseSpecialFeature";

@Entity("combat_phase", { schema: "lord_of_dungeons" })
export class CombatPhase {
  @PrimaryGeneratedColumn({ type: "int", name: "id_combat_phase" })
  idCombatPhase: number;

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

  @OneToMany(
    () => CombatPhaseCharacter,
    (combatPhaseCharacter) => combatPhaseCharacter.idCombatPhase2
  )
  combatPhaseCharacters: CombatPhaseCharacter[];

  @OneToMany(
    () => CombatPhaseMonster,
    (combatPhaseMonster) => combatPhaseMonster.idCombatPhase2
  )
  combatPhaseMonsters: CombatPhaseMonster[];

  @OneToMany(
    () => CombatPhaseSpecialFeature,
    (combatPhaseSpecialFeature) => combatPhaseSpecialFeature.idCombatPhase2
  )
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];
}
