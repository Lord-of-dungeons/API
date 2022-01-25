import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeUpdate, Index } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Index("fk_bill_stripe_id_idx", ["stripeId"], {})
@Index("fk_bill_user_idx", ["idUser"], {})
@Index("fk_bill_code_idx", ["code"], {})
@Entity("bill", { schema: "lord_of_dungeons" })
export class Bill {
  @PrimaryGeneratedColumn({ type: "int", name: "id_bill" })
  idBill: number;

  @Column("varchar", { name: "stripe_id" })
  stripeId: string;

  @Column("varchar", { name: "code" })
  code: string; // code de la commande du type #ERF75G

  @Column("double", { name: "total_ttc" })
  totalTtc: number;

  @Column("double", { name: "promo", default: 0 })
  promo: number;

  @Column("datetime", {
    name: "date_create",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date | null;

  @Column("datetime", {
    name: "date_update",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  dateUpdate: Date | null;

  @Column("int", { name: "id_user" })
  idUser: number;

  @ManyToOne(() => User, user => user.bills, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "id_user", referencedColumnName: "idUser" }])
  user: User;

  @OneToMany(() => Article, article => article.bill, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  articles: Article[];

  @BeforeUpdate()
  beforeUpdate() {
    this.dateUpdate = new Date();
  }
}
