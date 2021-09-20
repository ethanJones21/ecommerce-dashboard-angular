export interface orderClientItf {
  name: string;
  lastname: string;
}

export interface OrderItf {
  id: string;
  client: orderClientItf;
  nsale: string;
  total: number;
  delivery: number;
  transaction: string;
  coupon: string;
  state: string;
  address: string;
  phone: string;
  note: string;
  createdAt: Date;
}
