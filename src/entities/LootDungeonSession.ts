import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { DungeonSession } from "./DungeonSession";
import { _Object } from "./Object";

@Index("fk_loot_dungeon_session_dungeon_session1_idx", ["idDungeonSession"], {})
@Index("fk_loot_dungeon_session_character1_idx", ["idCharacter"], {})
@Index("fk_loot_dungeon_session_Object1_idx", ["idObject"], {})
@Entity("loot_dungeon_session", { schema: "lord_of_dungeons" })
export class LootDungeonSession {
  @PrimaryColumn("int", { name: "id_dungeon_session" })
  idDungeonSession: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @Column("int", { name: "id_object" })
  idObject: number;

  @ManyToOne(() => Character, character => character.lootDungeonSessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  character: Character;

  @ManyToOne(() => DungeonSession, dungeonSession => dungeonSession.lootDungeonSessions, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  @JoinColumn([{ name: "id_dungeon_session", referencedColumnName: "idDungeonSession" }])
  dungeonSession: DungeonSession;

  @ManyToOne(() => _Object, _object => _object.lootDungeonSessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_object", referencedColumnName: "idObject" }])
  _object: Object;
}
