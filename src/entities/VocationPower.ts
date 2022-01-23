import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Power } from "./Power";
import { Vocation } from "./Vocation";

@Index("fk_vocation_power_vocation1_idx", ["idVocation"], {})
@Index("fk_vocation_power_power1_idx", ["idPower"], {})
@Entity("vocation_power", { schema: "lord_of_dungeons" })
export class VocationPower {
  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("double", { name: "coeff", precision: 22, default: () => "'0'" })
  coeff: number;

  @PrimaryColumn("int", { name: "id_vocation" })
  idVocation: number;

  @Column("int", { name: "id_power" })
  idPower: number;

  @ManyToOne(() => Power, power => power.vocationPowers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_power", referencedColumnName: "idPower" }])
  power: Power;

  @ManyToOne(() => Vocation, vocation => vocation.vocationPowers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_vocation", referencedColumnName: "idVocation" }])
  vocation: Vocation;
}
