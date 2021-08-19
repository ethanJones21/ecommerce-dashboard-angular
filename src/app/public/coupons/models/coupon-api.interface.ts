import { CouponItf } from './coupon.interface';

export interface getCouponItf {
  ok: boolean;
  coupon: CouponItf;
}

export interface getCouponsItf {
  ok: boolean;
  coupons: onlyCouponsInfoItf;
}
export interface createUpdateCouponItf {
  ok: boolean;
  msg: string;
  coupon: CouponItf;
}

export interface deleteCouponItf {
  ok: boolean;
  msg: string;
}

export interface onlyCouponsInfoItf {
  coupons: CouponItf[];
  pages: number[];
  longitud: number;
  next: any; //number | {}
  previous: any; //number | {}
}
