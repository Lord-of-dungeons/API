import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { Monster } from "./Monster";
import { GameAnimation } from "./GameAnimation";

@Index("fk_monster_appearance_game_animation1_idx", ["idGameAnimation"], {})
@Entity("monster_appearance", { schema: "lord_of_dungeons" })
export class MonsterAppearance {
  @PrimaryGeneratedColumn({ type: "int", name: "id_monster_appearance" })
  idMonsterAppearance: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @VersionColumn()
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

  @OneToMany(() => Monster, monster => monster.monsterAppearance)
  monsters: Monster[];

  @ManyToOne(() => GameAnimation, gameAnimation => gameAnimation.monsterAppearances, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_game_animation", referencedColumnName: "idGameAnimation" }])
  gameAnimation: GameAnimation;
}
