import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "./Character";
import { Address } from "./Address";
import { UserCharacter } from "./UserCharacter";
import { UserFriends } from "./UserFriends";

@Index("email_UNIQUE", ["email"], { unique: true })
@Index("pseudo_UNIQUE", ["pseudo"], { unique: true })
@Index("fk_user_address_idx", ["idAddress"], {})
@Index("fk_user_refresh_token_idx", ["refreshToken"], { unique: true })
@Index("fk_user_token_idx", ["token"], { unique: true })
@Entity("user", { schema: "lord_of_dungeons" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id_user" })
  idUser: number;

  @Column("varchar", { name: "firstname", length: 45 })
  firstname: string;

  @Column("varchar", { name: "lastname", length: 45 })
  lastname: string;

  @Column("varchar", { name: "pseudo", unique: true, length: 45 })
  pseudo: string;

  @Column("varchar", { name: "email", unique: true, length: 45 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "facebook_id", nullable: true, length: 45 })
  facebookId: string | null;

  @Column("varchar", { name: "google_id", nullable: true, length: 45 })
  googleId: string | null;

  @Column("varchar", { name: "github_id", nullable: true, length: 45 })
  githubId: string | null;

  @Column("varchar", { name: "token", nullable: true, length: 1000 })
  token: string | null;

  @Column("varchar", { name: "refresh_token", nullable: true, length: 255 })
  refreshToken: string | null;

  @Column("tinyint", {
    name: "newsletter",
    default: () => "'1'",
  })
  newsletter: number | boolean;

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

  @Column("int", { name: "id_address", nullable: true })
  idAddress: number | null;

  @Column("date", { name: "birthday" })
  birthday: Date;

  @Column("varchar", { name: "profile_picture_path", length: 255 })
  profilePicturePath: string;

  @Column("enum", {
    name: "role",
    enum: ["USER", "ADMIN"],
  })
  role: "USER" | "ADMIN";

  @OneToMany(() => Character, character => character.idUser2)
  characters: Character[];

  @OneToOne(() => Address, address => address.user, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    cascade: true,
  })
  @JoinColumn([{ name: "id_address", referencedColumnName: "idAddress" }])
  address: Address | null;

  @OneToMany(() => UserCharacter, userCharacter => userCharacter.idUser2)
  userCharacters: UserCharacter[];

  @OneToMany(() => UserFriends, userFriends => userFriends.idUser2)
  userFriends: UserFriends[];

  @BeforeInsert()
  beforeInsert() {
    // si l'utilisateur renseigne rien, on ajoute un chemin par défaut
    this.profilePicturePath = this.profilePicturePath ? this.profilePicturePath : "/api/public/avatars/1.png";
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.dateUpdate = new Date();
  }
}
