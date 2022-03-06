import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CharacterEquipment } from "./CharacterEquipment";
import { EquipmentCategory } from "./EquipmentCategory";
import { SpecialFeature } from "./SpecialFeature";
import { EquipmentType } from "./EquipmentType";
import { InventoryEquipment } from "./InventoryEquipment";
import { BaseFeature } from "./BaseFeature";

@Index("fk_equipment_equipment_category1_idx", ["idEquipmentCategory"], {})
@Index("fk_equipment_special_feature1_idx", ["idSpecialFeature"], {})
@Index("fk_equipment_base_feature1_idx", ["idBaseFeature"], {})
@Entity("equipment", { schema: "lord_of_dungeons" })
export class Equipment {
  @PrimaryGeneratedColumn({ type: "int", name: "id_equipment" })
  idEquipment: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("tinyint", { name: "is_legendary", default: () => "'0'" })
  isLegendary: number;

  @Column("varchar", { name: "img_path", length: 255 })
  imgPath: string;

  @Column("int", { name: "id_equipment_category" })
  idEquipmentCategory: number;

  @Column("int", { name: "id_special_feature", nullable: true })
  idSpecialFeature: number | null;

  @Column("int", { name: "id_base_feature" })
  idBaseFeature: number;

  @Column("int", { name: "price", default: () => "'1'" })
  price: number;

  @OneToMany(() => CharacterEquipment, characterEquipment => characterEquipment.equipment)
  characterEquipments: CharacterEquipment[];

  @ManyToOne(() => EquipmentCategory, equipmentCategory => equipmentCategory.equipment, { onDelete: "NO ACTION", onUpdate: "NO ACTION", cascade: true  })
  @JoinColumn([
    {
      name: "id_equipment_category",
      referencedColumnName: "idEquipmentCategory",
    },
  ])
  equipmentCategory: EquipmentCategory;

  @ManyToOne(() => SpecialFeature, specialFeature => specialFeature.equipment, { onDelete: 'SET NULL', onUpdate: "NO ACTION", cascade: true  })
  @JoinColumn([{ name: "id_special_feature", referencedColumnName: "idSpecialFeature" }])
  specialFeature: SpecialFeature;

  @OneToOne(() => BaseFeature, baseFeature => baseFeature.vocation, { onDelete: "RESTRICT", onUpdate: "CASCADE", cascade: true })
  @JoinColumn([
    {
      name: "id_base_feature",
      referencedColumnName: "idBaseFeature",
    },
  ])
  baseFeature: BaseFeature;

  @OneToMany(() => EquipmentType, equipmentType => equipmentType.equipment)
  equipmentTypes: EquipmentType[];

  @OneToMany(() => InventoryEquipment, inventoryEquipment => inventoryEquipment.equipment)
  inventoryEquipments: InventoryEquipment[];
}
