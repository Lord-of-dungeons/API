import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Monster } from "./Monster";
import { Type } from "./Type";

@Index("fk_monster_type_monster1_idx", ["idMonster"], {})
@Index("fk_monster_type_type1_idx", ["idType"], {})
@Entity("monster_type", { schema: "lord_of_dungeons" })
export class MonsterType {
  @Column("int", { name: "up_per_level", default: () => "'1'" })
  upPerLevel: number;

  @PrimaryColumn("int", { name: "id_monster" })
  idMonster: number;

  @Column("int", { name: "id_type" })
  idType: number;

  @Column("int", { name: "base" })
  base: number;

  @ManyToOne(() => Monster, monster => monster.monsterTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  idMonster2: Monster;

  @ManyToOne(() => Type, type => type.monsterTypes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  idType2: Type;
}
