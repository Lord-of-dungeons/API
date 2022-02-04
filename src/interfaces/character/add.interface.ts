export interface IRequestBody {
  name: string;
  xp: bigint;
  fluz: bigint;
  id_user: number;
  is_dead: number; //tiny int 0 ou 1 (boolean)
  date_of_death: Date | null; // datetime
}
