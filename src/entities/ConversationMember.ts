import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Backup } from "./Backup";
import { User } from "./User";
import { Conversation } from "./Conversation";


@Entity("conversation_member", { schema: "lord_of_dungeons" })
export class ConversationMember {
    @PrimaryGeneratedColumn({ type: "int", name: "id_conversation_member" })
    idConversationMember: number;

    @Column("int", { name: "id_conversation" })
    idConversation: number;

    @Column("int", { name: "id_user" })
    idUser: number;


    @ManyToOne(type => Conversation, conversation => conversation.idConversation) conversation: Conversation;
    @ManyToOne(type => User, user => user.idUser) user: User;
}
