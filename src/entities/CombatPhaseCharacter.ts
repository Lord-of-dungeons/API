import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { CombatPhase } from "./CombatPhase";

@Index("fk_combat_phase_character_character1_idx", ["idCharacter"], {})
@Index("fk_combat_phase_character_combat_phase1_idx", ["idCombatPhase"], {})
@Entity("combat_phase_character", { schema: "lord_of_dungeons" })
export class CombatPhaseCharacter {
  @Column("int", { name: "health" })
  health: number;

  @Column("int", { name: "mana" })
  mana: number;

  @Column("int", { name: "latest_use_ulti", default: () => "'0'" })
  latestUseUlti: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @PrimaryColumn("int", { name: "id_combat_phase" })
  idCombatPhase: number;

  @ManyToOne(() => Character, character => character.combatPhaseCharacters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  idCharacter2: Character;

  @ManyToOne(() => CombatPhase, combatPhase => combatPhase.combatPhaseCharacters, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_combat_phase", referencedColumnName: "idCombatPhase" }])
  idCombatPhase2: CombatPhase;
}
