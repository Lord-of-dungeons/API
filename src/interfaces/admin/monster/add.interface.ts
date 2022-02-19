export interface IRequestBody {
  name: string;
  max_loot_item: number;
  xp: number;
  ultimate_ratio: number;
  monsterAppearance: IMonsterAppearance;
  baseFeature: IBaseFeature;
  ultimate: IUltimate;
}

interface IMonsterAppearance {
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
