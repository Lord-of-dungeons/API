import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { DungeonSession } from "./DungeonSession";

@Index("fk_dungeon_character_dungeon_session1_idx", ["idDungeonSession"], {})
@Index("fk_dungeon_character_character1_idx", ["idCharacter"], {})
@Entity("dungeon_character", { schema: "lord_of_dungeons" })
export class DungeonCharacter {
  @PrimaryColumn("int", { name: "id_dungeon_session" })
  idDungeonSession: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @ManyToOne(() => Character, character => character.dungeonCharacters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  idCharacter2: Character;

  @ManyToOne(() => DungeonSession, dungeonSession => dungeonSession.dungeonCharacters, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_dungeon_session", referencedColumnName: "idDungeonSession" }])
  idDungeonSession2: DungeonSession;
}
