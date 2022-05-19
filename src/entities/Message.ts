import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Backup } from "./Backup";
import { User } from "./User";
import { Conversation } from "./Conversation";


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


    @ManyToOne(type => User, user => user.idUser)
    @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
    user: User;

    @ManyToOne(type => Conversation, conversation => conversation.idConversation)
    @JoinColumn([{ name: "id_conversation", referencedColumnName: "idConversation" }])
    conversation: Conversation;
}
