import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./Event";
import { Position } from "./Position";

@Entity("map", { schema: "lord_of_dungeons" })
export class Map {
  @PrimaryGeneratedColumn({ type: "int", name: "id_map" })
  idMap: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "map_path", length: 255 })
  mapPath: string;

  @OneToMany(() => Event, (event) => event.idMap2)
  events: Event[];

  @OneToMany(() => Position, (position) => position.idMap2)
  positions: Position[];
}
