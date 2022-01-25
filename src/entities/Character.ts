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
import { UserCharacterArticle } from "./UserCharacterArticle";

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

  @OneToMany(() => Backup, backup => backup.charactercharacter)
  backups: Backup[];

  @ManyToOne(() => User, user => user.characters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: User;

  @OneToMany(() => CharacterEquipment, characterEquipment => characterEquipment.character)
  characterEquipments: CharacterEquipment[];

  @OneToMany(() => CombatPhaseCharacter, combatPhaseCharacter => combatPhaseCharacter.character)
  combatPhaseCharacters: CombatPhaseCharacter[];

  @OneToMany(() => CombatPhaseSpecialFeature, combatPhaseSpecialFeature => combatPhaseSpecialFeature.character)
  combatPhaseSpecialFeatures: CombatPhaseSpecialFeature[];

  @OneToMany(() => DungeonCharacter, dungeonCharacter => dungeonCharacter.character)
  dungeonCharacters: DungeonCharacter[];

  @OneToMany(() => DungeonSessionStatistics, dungeonSessionStatistics => dungeonSessionStatistics.character)
  dungeonSessionStatistics: DungeonSessionStatistics[];

  @OneToMany(() => Inventory, inventory => inventory.character)
  inventories: Inventory[];

  @OneToMany(() => LootDungeonSession, lootDungeonSession => lootDungeonSession.character)
  lootDungeonSessions: LootDungeonSession[];

  @OneToMany(() => UserCharacter, userCharacter => userCharacter.character)
  userCharacters: UserCharacter[];

  @OneToMany(() => UserCharacterArticle, userCharacterArticle => userCharacterArticle.character, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  userCharacterArticles: UserCharacterArticle[];
}
