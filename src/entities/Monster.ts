import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CombatPhaseMonster } from "./CombatPhaseMonster";
import { CombatPhaseSpecialFeature } from "./CombatPhaseSpecialFeature";
import { MonsterAppearence } from "./MonsterAppearence";
import { Ultimate } from "./Ultimate";
import { MonsterLoot } from "./MonsterLoot";
import { MonsterPower } from "./MonsterPower";
import { MonsterType } from "./MonsterType";

@Index("fk_monster_monster_appearence1_idx", ["idMonsterAppearence"], {})
@Index("fk_monster_ultimate1_idx", ["idUltimate"], {})
@Entity("monster", { schema: "lord_of_dungeons" })
export class Monster {
  @PrimaryGeneratedColumn({ type: "int", name: "id_monster" })
  idMonster: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("double", { name: "base", precision: 22, default: () => "'1'" })
  base: number;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

  @Column("int", { name: "max_loot_item", default: () => "'1'" })
  maxLootItem: number;

  @Column("int", { name: "xp", default: () => "'1'" })
  xp: number;

  @Column("double", {
    name: "ultimate_ratio",
    precision: 22,
    default: () => "'0'",
  })
  ultimateRatio: number;

  @Column("int", { name: "id_monster_appearence" })
  idMonsterAppearence: number;

  @Column("int", { name: "id_base_feature" })
  idBaseFeature: number;

  @Column("int", { name: "id_ultimate", nullable: true })
  idUltimate: number | null;

  @OneToMany(
    () => CombatPhaseMonster,
    (combatPhaseMonster) => combatPhaseMonster.idMonster2
  )
  combatPhaseMonsters: CombatPhaseMonster[];

  @OneToMany(
    () => CombatPhaseSpecialFeature,
    (combatPhaseSpecialFeature) => combatPhaseSpecialFeature.idMonster2
  )
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];

  @ManyToOne(
    () => MonsterAppearence,
    (monsterAppearence) => monsterAppearence.monsters,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    {
      name: "id_monster_appearence",
      referencedColumnName: "idMonsterAppearence",
    },
  ])
  idMonsterAppearence2: MonsterAppearence;

  @ManyToOne(() => Ultimate, (ultimate) => ultimate.monsters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_ultimate", referencedColumnName: "idUltimate" }])
  idUltimate2: Ultimate;

  @OneToMany(() => MonsterLoot, (monsterLoot) => monsterLoot.idMonster2)
  monsterLoots: MonsterLoot[];

  @OneToMany(() => MonsterPower, (monsterPower) => monsterPower.idMonster2)
  monsterPowers: MonsterPower[];

  @OneToMany(() => MonsterType, (monsterType) => monsterType.idMonster2)
  monsterTypes: MonsterType[];
}
