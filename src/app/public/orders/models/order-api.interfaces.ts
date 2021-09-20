import { OrderItf } from './order.interface';

export interface getOrderItf {
  ok: boolean;
  order: OrderItf;
  details: any;
}

export interface getOrdersItf {
  ok: boolean;
  orders: onlyOrdersInfoItf;
}
export interface createUpdateOrdersItf {
  ok: boolean;
  msg: string;
  order: OrderItf;
}

export interface desactivateOrderItf {
  ok: boolean;
  msg: string;
}

export interface onlyOrdersInfoItf {
  orders: OrderItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
