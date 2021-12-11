import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Character } from "./Character";
import { Equipment } from "./Equipment";

@Index("fk_character_equipment_character1_idx", ["idCharacter"], {})
@Index("fk_character_equipment_equipment1_idx", ["idEquipment"], {})
@Entity("character_equipment", { schema: "lord_of_dungeons" })
export class CharacterEquipment {
  @PrimaryColumn("int", { name: "id_character" })
  idCharacter: number;

  @Column("int", { name: "id_equipment" })
  idEquipment: number;

  @ManyToOne(() => Character, character => character.characterEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_character", referencedColumnName: "idCharacter" }])
  idCharacter2: Character;

  @ManyToOne(() => Equipment, equipment => equipment.characterEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_equipment", referencedColumnName: "idEquipment" }])
  idEquipment2: Equipment;
}
