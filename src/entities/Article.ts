import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bill } from "./Bill";
import { Shop } from "./Shop";
import { UserCharacterArticle } from "./UserCharacterArticle";

@Index("fk_article_bill_idx", ["idBill"], {})
@Index("fk_article_shop_idx", ["idShop"], {})
@Entity("article", { schema: "lord_of_dungeons" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id_article" })
  idArticle: number;

  @Column("int", { name: "id_shop" })
  idShop: number;

  @Column("int", { name: "id_bill" })
  idBill: number;

  @ManyToOne(() => Shop, shop => shop.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_shop", referencedColumnName: "idShop" }])
  shop: Shop;

  @ManyToOne(() => Bill, bill => bill.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_bill", referencedColumnName: "idBill" }])
  bill: Bill;

  @OneToMany(() => UserCharacterArticle, userCharacterArticle => userCharacterArticle.article, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  userCharacterArticles: UserCharacterArticle[];
}
