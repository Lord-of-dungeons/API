import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Index("fk_user_friends_user1_idx", ["idUser"], {})
@Entity("user_friends", { schema: "lord_of_dungeons" })
export class UserFriends {
  @Column("varchar", { name: "friend_pseudo", length: 45 })
  friendPseudo: string;

  @Column("datetime", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @PrimaryColumn("int", { name: "id_user" })
  idUser: number;

  @ManyToOne(() => User, user => user.userFriends, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: User;
}
