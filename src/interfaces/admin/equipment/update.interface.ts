export interface IRequestBody {
  name: string;
  is_legendary: number; //tiny int 0 ou 1 (boolean)
  img_path: string;
  price: number;
  equipmentCategory: IEquipmentFeature;
  specialFeature: ISpecialFeature;
  baseFeature: IBaseFeature;
}

interface IBaseFeature {
  health: number;
  mana: number;
  armor: number;
  attack: number;
  attack_speed: number;
  critical: number;
  wisdom: number;
}

interface ISpecialFeature {
  name: string;
  probability: number;
  base: number;
  duration: number;
  coeff: number;
}

interface IEquipmentFeature {
  name: string;
}
