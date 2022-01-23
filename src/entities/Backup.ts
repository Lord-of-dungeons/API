import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";
import { Position } from "./Position";

@Index("fk_backup_position1_idx", ["idPosition"], {})
@Index("fk_backup_character1_idx", ["characterIdCharacter"], {})
@Entity("backup", { schema: "lord_of_dungeons" })
export class Backup {
  @PrimaryGeneratedColumn({ type: "int", name: "id_backup" })
  idBackup: number;

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

  @Column("int", { name: "id_position" })
  idPosition: number;

  @Column("int", { name: "character_id_character" })
  characterIdCharacter: number;

  @ManyToOne(() => Character, character => character.backups, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "character_id_character", referencedColumnName: "idCharacter" }])
  charactercharacter: Character;

  @ManyToOne(() => Position, position => position.backups, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_position", referencedColumnName: "idPosition" }])
  idPosition2: Position;
}
