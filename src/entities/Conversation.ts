import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Backup } from "./Backup";
import { User } from "./User";
import { Message } from "./Message";
import { ConversationMember } from "./ConversationMember";


@Entity("conversation", { schema: "lord_of_dungeons" })
export class Conversation {
    @PrimaryGeneratedColumn({ type: "int", name: "id_conversation" })
    idConversation: number;

    @Column("datetime", {
        name: "date_update",
        default: () => "CURRENT_TIMESTAMP",
    })
    dateUpdate: Date;


    @OneToMany(type => ConversationMember, conversationMembers => conversationMembers.conversation) conversationMembers: ConversationMember[];
    @OneToMany(type => Message, messages => messages.conversation) messages: Message[];
}
