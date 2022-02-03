import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
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

  @VersionColumn()
  version: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("int", { name: "id_game_animation", nullable: true })
  idGameAnimation: number | null;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => Monster, monster => monster.ultimate)
  monsters: Monster[];

  @ManyToOne(() => GameAnimation, gameAnimation => gameAnimation.ultimates, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_game_animation", referencedColumnName: "idGameAnimation" }])
  gameAnimation: GameAnimation;

  @OneToMany(() => Vocation, vocation => vocation.ultimate)
  vocations: Vocation[];
}
