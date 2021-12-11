import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Backup } from "./Backup";
import { User } from "./User";
import { CharacterEquipment } from "./CharacterEquipment";
import { CombatPhaseCharacter } from "./CombatPhaseCharacter";
import { CombatPhaseSpecialFeature } from "./CombatPhaseSpecialFeature";
import { DungeonCharacter } from "./DungeonCharacter";
import { DungeonSessionStatistics } from "./DungeonSessionStatistics";
import { Inventory } from "./Inventory";
import { LootDungeonSession } from "./LootDungeonSession";
import { UserCharacter } from "./UserCharacter";

@Index("fk_character_user1_idx", ["idUser"], {})
@Entity("character", { schema: "lord_of_dungeons" })
export class Character {
  @PrimaryGeneratedColumn({ type: "int", name: "id_character" })
  idCharacter: number;

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

  @Column("bigint", { name: "xp", default: () => "'0'" })
  xp: string;

  @Column("bigint", { name: "fluz", default: () => "'0'" })
  fluz: string;

  @Column("int", { name: "id_user" })
  idUser: number;

  @Column("tinyint", { name: "is_dead", default: () => "'0'" })
  isDead: number;

  @Column("datetime", { name: "date_of_death", nullable: true })
  dateOfDeath: Date | null;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @OneToMany(() => Backup, backup => backup.characterIdCharacter2)
  backups: Backup[];

  @ManyToOne(() => User, user => user.characters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: User;

  @OneToMany(() => CharacterEquipment, characterEquipment => characterEquipment.idCharacter2)
  characterEquipments: CharacterEquipment[];

  @OneToMany(() => CombatPhaseCharacter, combatPhaseCharacter => combatPhaseCharacter.idCharacter2)
  combatPhaseCharacters: CombatPhaseCharacter[];

  @OneToMany(() => CombatPhaseSpecialFeature, combatPhaseSpecialFeature => combatPhaseSpecialFeature.idCharacter2)
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];

  @OneToMany(() => DungeonCharacter, dungeonCharacter => dungeonCharacter.idCharacter2)
  dungeonCharacters: DungeonCharacter[];

  @OneToMany(() => DungeonSessionStatistics, dungeonSessionStatistics => dungeonSessionStatistics.idCharacter2)
  dungeonSessionStatistics: DungeonSessionStatistics[];

  @OneToMany(() => Inventory, inventory => inventory.idCharacter2)
  inventories: Inventory[];

  @OneToMany(() => LootDungeonSession, lootDungeonSession => lootDungeonSession.idCharacter2)
  lootDungeonSessions: LootDungeonSession[];

  @OneToMany(() => UserCharacter, userCharacter => userCharacter.idCharacter2)
  userCharacters: UserCharacter[];
}
