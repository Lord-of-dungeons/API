import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InventoryObject } from "./InventoryObject";
import { LootDungeonSession } from "./LootDungeonSession";
import { MonsterLoot } from "./MonsterLoot";
import { Type } from "./Type";
import { ObjectType } from "./ObjectType";

@Index("fk_Object_type1_idx", ["idType"], {})
@Entity("Object", { schema: "lord_of_dungeons" })
export class Objects {
  @PrimaryGeneratedColumn({ type: "int", name: "id_object" })
  idObject: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("int", { name: "id_type" })
  idType: number;

  @Column("int", { name: "price", default: () => "'1'" })
  price: number;

  @OneToMany(() => InventoryObject, inventoryObject => inventoryObject._object)
  inventoryObjects: InventoryObject[];

  @OneToMany(() => LootDungeonSession, lootDungeonSession => lootDungeonSession._object)
  lootDungeonSessions: LootDungeonSession[];

  @OneToMany(() => MonsterLoot, monsterLoot => monsterLoot._object)
  monsterLoots: MonsterLoot[];

  @ManyToOne(() => Type, type => type.Objects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_type", referencedColumnName: "idType" }])
  type: Type;

  @OneToMany(() => ObjectType, ObjectType => ObjectType._object)
  ObjectTypes: ObjectType[];
}
