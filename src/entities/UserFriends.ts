import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export const SUER_FRIENDS_STATUS = ["PENDING", "ACCEPTED", "REFUSED"];
export type userFirendsStatusType = "PENDING" | "ACCEPTED" | "REFUSED";
@Index("fk_user_friends_user1_idx", ["idUser"], {})
@Index("fk_user_friends_friend_pseudo1_idx", ["friendPseudo"], {})
@Entity("user_friends", { schema: "lord_of_dungeons" })
export class UserFriends {
  @PrimaryGeneratedColumn({ name: "id_user_friends", type: "int" })
  idUserFriends: number;

  @Column("varchar", { name: "friend_pseudo", length: 45 })
  friendPseudo: string;

  @Column("varchar", { name: "profile_picture_path", length: 255 })
  profilePicturePath: string;

  @Column("enum", {
    name: "status",
    enum: SUER_FRIENDS_STATUS,
    default: "PENDING",
  })
  status: userFirendsStatusType;

  @Column("datetime", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("int", { name: "id_user" })
  idUser: number;

  @ManyToOne(() => User, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: User;
}
