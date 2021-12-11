export interface ICreateToken {}

export interface IToken extends ICreateToken {
  sub: string;
}
