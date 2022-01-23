import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Type } from "./Type";
import { Vocation } from "./Vocation";

@Index("fk_vocation_type_vocation1_idx", ["idVocation"], {})
@Index("fk_vocation_type_type1_idx", ["idType"], {})
@Entity("vocation_type", { schema: "lord_of_dungeons" })
export class VocationType {
  @Column("int", { name: "up_per_level", default: () => "'1'" })
  upPerLevel: number;

  @PrimaryColumn("int", { name: "id_vocation" })
  idVocation: number;

  @Column("int", { name: "id_type" })
  idType: number;

  @Column("int", { name: "base" })
  base: number;

  @ManyToOne(() => Type, type => type.vocationTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  idType2: Type;

  @ManyToOne(() => Vocation, vocation => vocation.vocationTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_vocation", referencedColumnName: "idVocation" }])
  vocation: Vocation;
}
