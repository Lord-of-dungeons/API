import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Monster } from "./Monster";
import { GameAnimation } from "./GameAnimation";

@Index("fk_monster_appearence_game_animation1_idx", ["idGameAnimation"], {})
@Entity("monster_appearence", { schema: "lord_of_dungeons" })
export class MonsterAppearence {
  @PrimaryGeneratedColumn({ type: "int", name: "id_monster_appearence" })
  idMonsterAppearence: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

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

  @Column("int", { name: "id_game_animation", nullable: true })
  idGameAnimation: number | null;

  @OneToMany(() => Monster, (monster) => monster.idMonsterAppearence2)
  monsters: Monster[];

  @ManyToOne(
    () => GameAnimation,
    (gameAnimation) => gameAnimation.monsterAppearences,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "id_game_animation", referencedColumnName: "idGameAnimation" },
  ])
  idGameAnimation2: GameAnimation;
}
