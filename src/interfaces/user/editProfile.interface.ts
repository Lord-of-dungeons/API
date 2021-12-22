export interface IRequestBody {
  firstname: string;
  lastname: string;
  newsletter: boolean;
  birthday: Date | string;
  address: IAddress | null;
}
export interface IAddress {
  city: string;
  zip_code: string;
  num_address: number;
  street: string;
  country: string;
}
