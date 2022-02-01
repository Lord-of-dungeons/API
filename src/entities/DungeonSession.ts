import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DungeonCharacter } from "./DungeonCharacter";
import { Dungeon } from "./Dungeon";
import { DungeonSessionStatistics } from "./DungeonSessionStatistics";
import { LootDungeonSession } from "./LootDungeonSession";

@Index("fk_dungeon_session_dungeon1_idx", ["idDungeon"], {})
@Index("fk_dungeon_session_code1_idx", ["code"], {})
@Index("fk_dungeon_session_uuid_idx", ["uuid"], {})
@Entity("dungeon_session", { schema: "lord_of_dungeons" })
export class DungeonSession {
  @PrimaryGeneratedColumn({ type: "int", name: "id_dungeon_session" })
  idDungeonSession: number;

  @Column("varchar", { name: "uuid", length: 45 })
  uuid: string;

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

  @Column("int", { name: "id_dungeon" })
  idDungeon: number;

  @Column("varchar", { name: "code", length: 6 })
  code: string;

  @Column("tinyint", { name: "is_active", default: () => "'1'" })
  isActive: number;

  @Column("tinyint", { name: "lobby_phase", default: () => "'1'" })
  lobbyPhase: number;

  @OneToMany(() => DungeonCharacter, dungeonCharacter => dungeonCharacter.dungeonSession)
  dungeonCharacters: DungeonCharacter[];

  @ManyToOne(() => Dungeon, dungeon => dungeon.dungeonSessions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_dungeon", referencedColumnName: "idDungeon" }])
  dungeon: Dungeon;

  @OneToMany(() => DungeonSessionStatistics, dungeonSessionStatistics => dungeonSessionStatistics.dungeonSession)
  dungeonSessionStatistics: DungeonSessionStatistics[];

  @OneToMany(() => LootDungeonSession, lootDungeonSession => lootDungeonSession.dungeonSession)
  lootDungeonSessions: LootDungeonSession[];
}
