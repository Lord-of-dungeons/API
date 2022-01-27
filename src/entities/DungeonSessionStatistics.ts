import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { DungeonSession } from "./DungeonSession";
import { Statistics } from "./Statistics";

@Index("fk_dungeon_session_statistics_dungeon_session1_idx", ["idDungeonSession"], {})
@Index("fk_dungeon_session_statistics_character1_idx", ["idCharacter"], {})
@Index("fk_dungeon_session_statistics_statistics1_idx", ["idStatistics"], {})
@Entity("dungeon_session_statistics", { schema: "lord_of_dungeons" })
export class DungeonSessionStatistics {
  @PrimaryColumn("int", { name: "id_dungeon_session" })
  idDungeonSession: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @Column("int", { name: "id_statistics" })
  idStatistics: number;

  @ManyToOne(() => Character, character => character.dungeonSessionStatistics, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  character: Character;

  @ManyToOne(() => DungeonSession, dungeonSession => dungeonSession.dungeonSessionStatistics, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_dungeon_session", referencedColumnName: "idDungeonSession" }])
  idDungeonSession2: DungeonSession;

  @ManyToOne(() => Statistics, statistics => statistics.dungeonSessionStatistics, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_statistics", referencedColumnName: "idStatistics" }])
  idStatistics2: Statistics;
}
