import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Backup } from "./Backup";
import { Map } from "./Map";

@Index("fk_position_map1_idx", ["idMap"], {})
@Entity("position", { schema: "lord_of_dungeons" })
export class Position {
  @PrimaryGeneratedColumn({ type: "int", name: "id_position" })
  idPosition: number;

  @Column("int", { name: "x" })
  x: number;

  @Column("int", { name: "y" })
  y: number;

  @Column("int", { name: "id_map" })
  idMap: number;

  @OneToMany(() => Backup, backup => backup.idPosition2)
  backups: Backup[];

  @ManyToOne(() => Map, map => map.positions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_map", referencedColumnName: "idMap" }])
  idMap2: Map;
}
