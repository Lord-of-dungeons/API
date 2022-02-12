export interface IRequestBody {
  name: string;
  img_path: string;
  price: number;
  type: IType;
}

interface IType {
  name: string;
}
