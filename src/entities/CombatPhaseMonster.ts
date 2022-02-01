import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { CombatPhase } from "./CombatPhase";
import { Monster } from "./Monster";

@Index("fk_combat_phase_monster_monster1_idx", ["idMonster"], {})
@Index("fk_combat_phase_monster_combat_phase1_idx", ["idCombatPhase"], {})
@Entity("combat_phase_monster", { schema: "lord_of_dungeons" })
export class CombatPhaseMonster {
  @Column("int", { name: "health" })
  health: number;

  @Column("int", { name: "mana" })
  mana: number;

  @Column("int", { name: "latest_use_ulti", default: () => "'0'" })
  latestUseUlti: number;

  @Column("int", { name: "id_monster" })
  idMonster: number;

  @PrimaryColumn("int", { name: "id_combat_phase" })
  idCombatPhase: number;

  @ManyToOne(() => CombatPhase, combatPhase => combatPhase.combatPhaseMonsters, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_combat_phase", referencedColumnName: "idCombatPhase" }])
  combatPhase: CombatPhase;

  @ManyToOne(() => Monster, monster => monster.combatPhaseMonsters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  monster: Monster;
}
