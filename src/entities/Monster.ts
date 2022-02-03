import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { CombatPhaseMonster } from "./CombatPhaseMonster";
import { CombatPhaseSpecialFeature } from "./CombatPhaseSpecialFeature";
import { MonsterAppearance } from "./MonsterAppearance";
import { Ultimate } from "./Ultimate";
import { MonsterLoot } from "./MonsterLoot";
import { MonsterPower } from "./MonsterPower";
import { MonsterType } from "./MonsterType";
import { BaseFeature } from "./BaseFeature";

@Index("fk_monster_monster_appearance1_idx", ["idMonsterAppearance"], {})
@Index("fk_monster_ultimate1_idx", ["idUltimate"], {})
@Entity("monster", { schema: "lord_of_dungeons" })
export class Monster {
  @PrimaryGeneratedColumn({ type: "int", name: "id_monster" })
  idMonster: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @VersionColumn()
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

  @Column("int", { name: "id_monster_appearance" })
  idMonsterAppearance: number;

  @Column("int", { name: "id_base_feature" })
  idBaseFeature: number;

  @Column("int", { name: "id_ultimate", nullable: true })
  idUltimate: number | null;

  @OneToMany(() => CombatPhaseMonster, combatPhaseMonster => combatPhaseMonster.monster)
  combatPhaseMonsters: CombatPhaseMonster[];

  @OneToMany(() => CombatPhaseSpecialFeature, combatPhaseSpecialFeature => combatPhaseSpecialFeature.monster)
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];

  @OneToOne(() => BaseFeature, baseFeature => baseFeature.monster, { onDelete: "NO ACTION", onUpdate: "NO ACTION", cascade: true })
  @JoinColumn([
    {
      name: "id_base_feature",
      referencedColumnName: "idBaseFeature",
    },
  ])
  baseFeature: BaseFeature;

  @ManyToOne(() => MonsterAppearance, monsterAppearance => monsterAppearance.monsters, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([
    {
      name: "id_monster_appearance",
      referencedColumnName: "idMonsterAppearance",
    },
  ])
  monsterAppearance: MonsterAppearance;

  @ManyToOne(() => Ultimate, ultimate => ultimate.monsters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_ultimate", referencedColumnName: "idUltimate" }])
  ultimate: Ultimate;

  @OneToMany(() => MonsterLoot, monsterLoot => monsterLoot.monster)
  monsterLoots: MonsterLoot[];

  @OneToMany(() => MonsterPower, monsterPower => monsterPower.monster)
  monsterPowers: MonsterPower[];

  @OneToMany(() => MonsterType, monsterType => monsterType.monster)
  monsterTypes: MonsterType[];
}
