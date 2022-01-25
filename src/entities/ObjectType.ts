import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { _Object } from "./Object";
import { Type } from "./Type";

@Index("fk_Object_type_Object1_idx", ["idObject"], {})
@Index("fk_Object_type_type1_idx", ["idType"], {})
@Entity("object_type", { schema: "lord_of_dungeons" })
export class ObjectType {
  @Column("int", { name: "base" })
  base: number;

  @PrimaryColumn("int", { name: "id_object" })
  idObject: number;

  @Column("int", { name: "id_type" })
  idType: number;

  @ManyToOne(() => _Object, _object => _object.ObjectTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_object", referencedColumnName: "idObject" }])
  _object: Object;

  @ManyToOne(() => Type, type => type.ObjectTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  type: Type;
}
