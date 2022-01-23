import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MonsterAppearence } from "./MonsterAppearence";
import { Power } from "./Power";
import { Ultimate } from "./Ultimate";
import { VocationAppearance } from "./VocationAppearance";

@Entity("game_animation", { schema: "lord_of_dungeons" })
export class GameAnimation {
  @PrimaryGeneratedColumn({ type: "int", name: "id_game_animation" })
  idGameAnimation: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "path", length: 255 })
  path: string;

  @OneToMany(() => MonsterAppearence, monsterAppearence => monsterAppearence.gameAnimation)
  monsterAppearences: MonsterAppearence[];

  @OneToMany(() => Power, power => power.gameAnimation)
  powers: Power[];

  @OneToMany(() => Ultimate, ultimate => ultimate.gameAnimation)
  ultimates: Ultimate[];

  @OneToMany(() => VocationAppearance, vocationAppearance => vocationAppearance.gameAnimation)
  vocationAppearances: VocationAppearance[];
}
