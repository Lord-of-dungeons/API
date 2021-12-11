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
import { Vocation } from "./Vocation";

@Index("fk_ultimate_game_animation1_idx", ["idGameAnimation"], {})
@Entity("ultimate", { schema: "lord_of_dungeons" })
export class Ultimate {
  @PrimaryGeneratedColumn({ type: "int", name: "id_ultimate" })
  idUltimate: number;

  @Column("int", { name: "mana", default: () => "'0'" })
  mana: number;

  @Column("double", { name: "base", precision: 22, default: () => "'1'" })
  base: number;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("int", { name: "id_game_animation", nullable: true })
  idGameAnimation: number | null;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => Monster, (monster) => monster.idUltimate2)
  monsters: Monster[];

  @ManyToOne(() => GameAnimation, (gameAnimation) => gameAnimation.ultimates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_game_animation", referencedColumnName: "idGameAnimation" },
  ])
  idGameAnimation2: GameAnimation;

  @OneToMany(() => Vocation, (vocation) => vocation.idUltimate2)
  vocations: Vocation[];
}
