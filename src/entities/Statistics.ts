import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DungeonSessionStatistics } from "./DungeonSessionStatistics";
import { Season } from "./Season";

@Index("fk_statistics_season1_idx", ["idSeason"], {})
@Entity("statistics", { schema: "lord_of_dungeons" })
export class Statistics {
  @PrimaryGeneratedColumn({ type: "int", name: "id_statistics" })
  idStatistics: number;

  @Column("int", { name: "kill", default: () => "'0'" })
  kill: number;

  @Column("int", { name: "death", default: () => "'0'" })
  death: number;

  @Column("int", { name: "level_start", default: () => "'1'" })
  levelStart: number;

  @Column("int", { name: "level_end", default: () => "'1'" })
  levelEnd: number;

  @Column("bigint", { name: "playing_time", default: () => "'0'" })
  playingTime: string;

  @Column("int", { name: "id_season" })
  idSeason: number;

  @OneToMany(() => DungeonSessionStatistics, dungeonSessionStatistics => dungeonSessionStatistics.idStatistics2)
  dungeonSessionStatistics: DungeonSessionStatistics[];

  @ManyToOne(() => Season, season => season.statistics, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_season", referencedColumnName: "idSeason" }])
  season: Season;
}
