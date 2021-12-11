import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Monster } from "./Monster";
import { Power } from "./Power";

@Index("fk_monster_power_monster1_idx", ["idMonster"], {})
@Index("fk_monster_power_power1_idx", ["idPower"], {})
@Entity("monster_power", { schema: "lord_of_dungeons" })
export class MonsterPower {
  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("double", { name: "coeff", precision: 22, default: () => "'1'" })
  coeff: number;

  @PrimaryColumn("int", { name: "id_monster" })
  idMonster: number;

  @Column("int", { name: "id_power" })
  idPower: number;

  @ManyToOne(() => Monster, monster => monster.monsterPowers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_monster", referencedColumnName: "idMonster" }])
  idMonster2: Monster;

  @ManyToOne(() => Power, power => power.monsterPowers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_power", referencedColumnName: "idPower" }])
  idPower2: Power;
}
