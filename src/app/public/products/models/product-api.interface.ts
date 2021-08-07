import { ProductItf } from './product.interface';

export interface GETPRODUCTS {
  ok: boolean;
  products: ONLYPRODUCTSINFO;
}
export interface CREATEUPDATEPRODUCT {
  ok: boolean;
  msg: string;
  product: ProductItf;
}

export interface DESACTIVATEPRODUCT {
  ok: boolean;
  msg: string;
}

export interface ONLYPRODUCTSINFO {
  products: ProductItf[];
  next: number | {};
  previous: number | {};
  pages: any[];
  longitud: number;
}
