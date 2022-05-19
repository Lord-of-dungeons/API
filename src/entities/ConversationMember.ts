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

    @Column("varchar", { name: "pseudo", length: 45 })
    pseudo: string;


    @ManyToOne(type => Conversation, conversation => conversation.idConversation)
    @JoinColumn([{ name: "id_conversation", referencedColumnName: "idConversation" }])
    conversation: Conversation;

    @ManyToOne(type => User, user => user.idUser)
    @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
    user: User;
}
