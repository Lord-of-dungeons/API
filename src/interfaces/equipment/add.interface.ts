export interface IRequestBody {
  name: string;
  is_legendary: number; //tiny int 0 ou 1 (boolean)
  img_path: string;
  price: number;
  id_equipment_category: number;
  id_special_feature: number | null;
  id_base_feature: number;
}
