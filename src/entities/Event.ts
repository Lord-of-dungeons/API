import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Map } from "./Map";

@Index("fk_event_map1_idx", ["idMap"], {})
@Entity("event", { schema: "lord_of_dungeons" })
export class Event {
  @PrimaryGeneratedColumn({ type: "int", name: "id_event" })
  idEvent: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("int", { name: "id_map" })
  idMap: number;

  @ManyToOne(() => Map, map => map.events, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    cascade: true
  })
  @JoinColumn([{ name: "id_map", referencedColumnName: "idMap" }])
  map: Map;
}
