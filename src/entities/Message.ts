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


@Entity("message", { schema: "lord_of_dungeons" })
export class Message {
    @PrimaryGeneratedColumn({ type: "int", name: "id_message" })
    idMessage: number;

    @Column("varchar", { name: "content", length: 1000 })
    content: string;


    @Column("int", { name: "id_conversation" })
    idConversation: number;

    @Column("int", { name: "id_user" })
    idUser: number;

    @Column("datetime", {
        name: "date_create",
        default: () => "CURRENT_TIMESTAMP",
    })
    dateCreate: Date;


    @ManyToOne(type => User, user => user.idUser) user: User;
}
