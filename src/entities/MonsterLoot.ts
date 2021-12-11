import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Monster } from "./Monster";
import { Objects } from "./Object";

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

  @Column("int", { name: "id_Object" })
  idObject: number;

  @ManyToOne(() => Monster, monster => monster.monsterLoots, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  idMonster2: Monster;

  @ManyToOne(() => Objects, Object => Object.monsterLoots, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_Object", referencedColumnName: "idObject" }])
  idObject2: Object;
}
