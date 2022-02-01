import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Monster } from "./Monster";
import { _Object } from "./Object";

@Index("fk_monster_loot_monster1_idx", ["idMonster"], {})
@Index("fk_monster_loot_Object1_idx", ["idObject"], {})
@Entity("monster_loot", { schema: "lord_of_dungeons" })
export class MonsterLoot {
  @Column("double", {
    name: "probability",
    precision: 22,
    default: () => "'0'",
  })
  probability: number;

  @PrimaryColumn("int", { name: "id_monster" })
  idMonster: number;

  @Column("int", { name: "id_object" })
  idObject: number;

  @ManyToOne(() => Monster, monster => monster.monsterLoots, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  monster: Monster;

  @ManyToOne(() => _Object, _object => _object.monsterLoots, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_object", referencedColumnName: "idObject" }])
  _object: Object;
}
