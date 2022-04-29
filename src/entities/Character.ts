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
import { UserCharacterArticle } from "./UserCharacterArticle";
import { Vocation } from "./Vocation";

@Index("fk_character_user1_idx", ["idUser"], {})
@Index("fk_character_vocation1_idx", ["idVocation"], {})
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

  @Column("int", { name: "id_vocation" })
  idVocation: number;

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

  @ManyToOne(() => Vocation, vocation => vocation.characters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_vocation", referencedColumnName: "idVocation" }])
  vocation: Vocation;

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

  @OneToMany(() => UserCharacterArticle, userCharacterArticle => userCharacterArticle.character, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  userCharacterArticles: UserCharacterArticle[];
}
