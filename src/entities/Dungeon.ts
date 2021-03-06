import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DungeonSession } from "./DungeonSession";

@Entity("dungeon", { schema: "lord_of_dungeons" })
export class Dungeon {
  @PrimaryGeneratedColumn({ type: "int", name: "id_dungeon" })
  idDungeon: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "map_path", length: 255 })
  mapPath: string;

  @Column("datetime", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("datetime", {
    name: "date_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date;

  @Column("int", { name: "version", default: () => "'1'" })
  version: number;

  @OneToMany(
    () => DungeonSession,
    (dungeonSession) => dungeonSession.idDungeon2
  )
  dungeonSessions: DungeonSession[];
}
