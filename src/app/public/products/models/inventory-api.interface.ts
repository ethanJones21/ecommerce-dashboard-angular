import { InventoryItf } from './inventory.interface';

export interface getInventoryItf {
  ok: boolean;
  inventory: InventoryItf;
}

export interface getInventoriesItf {
  ok: boolean;
  inventories: onlyInventoriesInfoItf;
}
export interface createUpdateInventoryItf {
  ok: boolean;
  msg: string;
  inventory: InventoryItf;
}

export interface deleteInventoryItf {
  ok: boolean;
  msg: string;
}

export interface onlyInventoriesInfoItf {
  inventories: InventoryItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
