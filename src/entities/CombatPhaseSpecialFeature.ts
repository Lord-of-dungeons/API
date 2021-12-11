import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { CombatPhase } from "./CombatPhase";
import { Monster } from "./Monster";
import { SpecialFeature } from "./SpecialFeature";

@Index("fk_combat_phase_special_feature_special_feature1_idx", ["idSpecialFeature"], {})
@Index("fk_combat_phase_special_feature_combat_phase1_idx", ["idCombatPhase"], {})
@Index("fk_combat_phase_special_feature_character1_idx", ["idCharacter"], {})
@Index("fk_combat_phase_special_feature_monster1_idx", ["idMonster"], {})
@Entity("combat_phase_special_feature", { schema: "lord_of_dungeons" })
export class CombatPhaseSpecialFeature {
  @Column("int", { name: "duration_remaining", default: () => "'1'" })
  durationRemaining: number;

  @Column("int", { name: "id_special_feature" })
  idSpecialFeature: number;

  @PrimaryColumn("int", { name: "id_combat_phase" })
  idCombatPhase: number;

  @Column("int", { name: "id_character", nullable: true })
  idCharacter: number | null;

  @Column("int", { name: "id_monster", nullable: true })
  idMonster: number | null;

  @ManyToOne(() => Character, character => character.combatPhaseSpecialFeatures, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  idCharacter2: Character;

  @ManyToOne(() => CombatPhase, combatPhase => combatPhase.combatPhaseSpecialFeatures, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_combat_phase", referencedColumnName: "idCombatPhase" }])
  idCombatPhase2: CombatPhase;

  @ManyToOne(() => Monster, monster => monster.combatPhaseSpecialFeatures, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  idMonster2: Monster;

  @ManyToOne(() => SpecialFeature, specialFeature => specialFeature.combatPhaseSpecialFeatures, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_special_feature", referencedColumnName: "idSpecialFeature" }])
  idSpecialFeature2: SpecialFeature;
}
