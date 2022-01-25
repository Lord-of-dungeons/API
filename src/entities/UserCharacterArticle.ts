import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Article } from "./Article";
import { Character } from "./Character";
import { User } from "./User";

@Index("fk_user_character_article_article_idx", ["idArticle"], {})
@Index("fk_user_character_article_character_idx", ["idCharacter"], {})
@Index("fk_user_character_article_user_idx", ["idUser"], {})
@Entity("user_character_article", { schema: "lord_of_dungeons" })
export class UserCharacterArticle {
  @PrimaryColumn({ type: "int", name: "id_user" })
  idUser: number;

  @PrimaryColumn({ type: "int", name: "id_article" })
  idArticle: number;

  @Column("int", { name: "id_character", nullable: true, default: null })
  idCharacter: number | null;

  @ManyToOne(() => User, user => user.userCharacterArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: User;

  @ManyToOne(() => Article, article => article.userCharacterArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_article", referencedColumnName: "idArticle" }])
  article: Article;

  @ManyToOne(() => Character, character => character.userCharacterArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  character: Character;
}
