export interface IRequestBody {
  name: string;
  map: IMap;
}

interface IMap {
  name: string;
  map_path: string;
}
