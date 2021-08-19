import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  setNewCoupon(form: FormGroup, coupon: any) {
    const { code, type, value, limit } = coupon;
    form.setValue({
      codeCoupon: code,
      typeCoupon: type,
      valueCoupon: value,
      limitCoupon: limit,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      codeCoupon: '',
      typeCoupon: 'Valor Fijo',
      valueCoupon: 0,
      limitCoupon: 0,
    });
  }
}
