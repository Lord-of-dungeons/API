import { CACHE_TIME } from "@utils/constantes";

export default class Cache {
  private _ttl = CACHE_TIME; // 15min
  private _userCache: unknown | undefined | 0; // quand on supprime le cache utilisateur, sa valeur est égale à 0
  private _emailTarget: string;
  private _ip: string;

  constructor(ip: string, emailTarget: string) {
    this._emailTarget = emailTarget;
    this._ip = ip;
    this._userCache = myCache.get(this._ip);
  }

  public userCanConnect() {
    // si l'utilisateur n'a pas de cache alors oui il peut
    if (!Boolean(this._userCache)) return true;

    // s'il n'y a pas de valeurs pour l'email alors il peut
    if (!Boolean(this._userCache[this._emailTarget])) return true;

    // si l'email de son cache dépasse est inférieur à 5 alors il peut
    if (this._userCache[this._emailTarget] < 5) return true;

    return false;
  }

  public setUserTentativeInCache() {
    // si pas encore de cache
    if (!this._userCache) {
      const obj = { [this._emailTarget]: 1 };
      myCache.set(this._ip, obj, this._ttl);
      return;
    }

    // on récupère les valeurs
    const obj = this._userCache;
    // on concataine les valeurs en incrémentant/initialisant par rapport à l'email
    obj[this._emailTarget] = obj[this._emailTarget] ? obj[this._emailTarget] + 1 : 1;

    myCache.set(this._ip, obj, this._ttl);
  }

  public removeUserCacheByEmailTarget() {
    if (!this._userCache) return;

    // suppression de l'email
    delete this._userCache[this._emailTarget];

    // si y'a plus de valeur, on supprime le cache entier
    if (Object.keys(this._userCache).length === 0) {
      myCache.del(this._ip);
      return;
    }

    myCache.set(this._ip, this._userCache, this._ttl);
  }
}
