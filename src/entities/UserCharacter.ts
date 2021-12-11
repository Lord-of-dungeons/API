import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { User } from "./User";

@Index("fk_user_character_user1_idx", ["idUser"], {})
@Index("fk_user_character_character1_idx", ["idCharacter"], {})
@Entity("user_character", { schema: "lord_of_dungeons" })
export class UserCharacter {
  @PrimaryColumn("int", { name: "id_user" })
  idUser: number;

  @Column("int", { name: "id_character" })
  idCharacter: number;

  @ManyToOne(() => Character, character => character.userCharacters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  idCharacter2: Character;

  @ManyToOne(() => User, user => user.userCharacters, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  idUser2: User;
}
