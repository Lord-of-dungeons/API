import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, OneToOne, VersionColumn } from "typeorm";
import { BaseFeature } from "./BaseFeature";
import { Ultimate } from "./Ultimate";
import { VocationAppearance } from "./VocationAppearance";
import { VocationPower } from "./VocationPower";
import { VocationType } from "./VocationType";

@Index("fk_vocation_vocation_appearance1_idx", ["idVocationAppearance"], {})
@Index("fk_vocation_base_feature1_idx", ["idBaseFeature"], {})
@Index("fk_vocation_ultimate1_idx", ["idUltimate"], {})
@Entity("vocation", { schema: "lord_of_dungeons" })
export class Vocation {
  @PrimaryGeneratedColumn({ type: "int", name: "id_vocation" })
  idVocation: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @VersionColumn()
  version: number;

  @Column("int", { name: "id_vocation_appearance" })
  idVocationAppearance: number;

  @Column("int", { name: "id_base_feature" })
  idBaseFeature: number;

  @Column("int", { name: "id_ultimate", nullable: true })
  idUltimate: number | null;

  @ManyToOne(() => Ultimate, ultimate => ultimate.vocations, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_ultimate", referencedColumnName: "idUltimate" }])
  ultimate: Ultimate;

  @ManyToOne(() => VocationAppearance, vocationAppearance => vocationAppearance.vocations, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([
    {
      name: "id_vocation_appearance",
      referencedColumnName: "idVocationAppearance",
    },
  ])
  idVocationAppearance2: VocationAppearance;

  @OneToOne(() => BaseFeature, baseFeature => baseFeature.vocation, { onDelete: "NO ACTION", onUpdate: "NO ACTION", cascade: true })
  @JoinColumn([
    {
      name: "id_base_feature",
      referencedColumnName: "idBaseFeature",
    },
  ])
  baseFeature: BaseFeature;

  @OneToMany(() => VocationPower, vocationPower => vocationPower.vocation)
  vocationPowers: VocationPower[];

  @OneToMany(() => VocationType, vocationType => vocationType.vocation)
  vocationTypes: VocationType[];
}
