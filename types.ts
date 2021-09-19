export interface ProductSchema {
  _id: { $oid: string };
  name: string;
  description: string;
  price: number;
}