import * as argon2 from "argon2";

export default class Password {
  public static async hash(password: string) {
    return await argon2.hash(password, { saltLength: 10 });
  }

  public static async compare(password: string, hash: string) {
    return await argon2.verify(hash, password);
  }
}
