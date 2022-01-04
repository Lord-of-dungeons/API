import { IAddress } from "@utils/classes/Address";

export interface IRequestBody {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  newsletter: boolean;
  birthday: Date;
  profile_picture_path?: string;
  google_id: string;
  address?: IAddress | null;
}
