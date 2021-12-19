export interface IRequestBody {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
  confirm_password: string;
  newsletter: boolean;
  birthday: Date;
  profile_picture_path?: string;
  address?: IAddress | null;
}
export interface IAddress {
  city: string;
  zip_code: string;
  num_address: number;
  street: string;
  country: string;
}
