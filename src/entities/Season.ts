import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Statistics } from "./Statistics";

@Entity("season", { schema: "lord_of_dungeons" })
export class Season {
  @PrimaryGeneratedColumn({ type: "int", name: "id_season" })
  idSeason: number;

  @Column("varchar", { name: "year", nullable: true, length: 45 })
  year: string | null;

  @OneToMany(() => Statistics, statistics => statistics.season)
  statistics: Statistics[];
}
