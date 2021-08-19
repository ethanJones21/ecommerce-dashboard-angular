import { FormGroup } from '@angular/forms';
export class CouponClass {
  code: number;
  type: string;
  value: number;
  limit: number;
  createdAt?: any;

  constructor(form: FormGroup) {
    const {
      codeCoupon: code,
      typeCoupon: type,
      valueCoupon: value,
      limitCoupon: limit,
    } = form.value;
    this.code = code;
    this.type = type;
    this.value = value;
    this.limit = limit;
  }
}
