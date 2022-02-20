export interface IRequestBody {
  name: string;
  //id_vocation_appearance: number;
  //id_base_feature: number;
  //id_ultimate: number | null;
  vocationAppearance: IVocationAppearance;
  baseFeature: IBaseFeature;
  ultimate: IUltimate;
}

interface IVocationAppearance {
  img_path: string;
  gameAnimation: IGameAnimation;
}

interface IGameAnimation {
  name: string;
  path: string;
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

interface IUltimate {
  mana: number;
  base: number;
  img_path: string;
  name: string;
  gameAnimation: IGameAnimation;
}
