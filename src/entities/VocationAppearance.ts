import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, VersionColumn, OneToOne } from "typeorm";
import { Vocation } from "./Vocation";
import { GameAnimation } from "./GameAnimation";

@Index("fk_vocation_appearance_game_animation1_idx", ["idGameAnimation"], {})
@Entity("vocation_appearance", { schema: "lord_of_dungeons" })
export class VocationAppearance {
  @PrimaryGeneratedColumn({ type: "int", name: "id_vocation_appearance" })
  idVocationAppearance: number;

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

  @OneToOne(() => Vocation, vocation => vocation.vocationAppearance, { onDelete: "CASCADE" })
  vocation: Vocation;

  @ManyToOne(() => GameAnimation, gameAnimation => gameAnimation.vocationAppearances, { onDelete: "SET NULL", onUpdate: "CASCADE", cascade: true })
  @JoinColumn([{ name: "id_game_animation", referencedColumnName: "idGameAnimation" }])
  gameAnimation: GameAnimation;
}
