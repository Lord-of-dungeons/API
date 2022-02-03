import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { MonsterPower } from "./MonsterPower";
import { GameAnimation } from "./GameAnimation";
import { SpecialFeature } from "./SpecialFeature";
import { VocationPower } from "./VocationPower";

@Index("fk_power_special_feature1_idx", ["idSpecialFeature"], {})
@Index("fk_power_game_animation1_idx", ["idGameAnimation"], {})
@Entity("power", { schema: "lord_of_dungeons" })
export class Power {
  @PrimaryGeneratedColumn({ type: "int", name: "id_power" })
  idPower: number;

  @Column("int", { name: "mana", default: () => "'0'" })
  mana: number;

  @Column("double", { name: "base", precision: 22, default: () => "'1'" })
  base: number;

  @VersionColumn()
  version: number;

  @Column("int", { name: "id_special_feature", nullable: true })
  idSpecialFeature: number | null;

  @Column("int", { name: "id_game_animation" })
  idGameAnimation: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => MonsterPower, monsterPower => monsterPower.power)
  monsterPowers: MonsterPower[];

  @ManyToOne(() => GameAnimation, gameAnimation => gameAnimation.powers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_game_animation", referencedColumnName: "idGameAnimation" }])
  gameAnimation: GameAnimation;

  @ManyToOne(() => SpecialFeature, specialFeature => specialFeature.powers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_special_feature", referencedColumnName: "idSpecialFeature" }])
  specialFeature: SpecialFeature;

  @OneToMany(() => VocationPower, vocationPower => vocationPower.power)
  vocationPowers: VocationPower[];
}
