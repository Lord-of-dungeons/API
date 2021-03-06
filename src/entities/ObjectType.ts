import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Objects } from "./Object";
import { Type } from "./Type";

@Index("fk_Object_type_Object1_idx", ["idObject"], {})
@Index("fk_Object_type_type1_idx", ["idType"], {})
@Entity("Object_type", { schema: "lord_of_dungeons" })
export class ObjectType {
  @Column("int", { name: "base" })
  base: number;

  @PrimaryColumn("int", { name: "id_Object" })
  idObject: number;

  @Column("int", { name: "id_type" })
  idType: number;

  @ManyToOne(() => Objects, Object => Object.ObjectTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_Object", referencedColumnName: "idObject" }])
  idObject2: Object;

  @ManyToOne(() => Type, type => type.ObjectTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  idType2: Type;
}
