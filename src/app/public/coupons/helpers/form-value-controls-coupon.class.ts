import { FormGroup } from '@angular/forms';
export class formValueControlsCoupon {
  constructor(private form: FormGroup) {}

  get codeCoupon() {
    const code = this.form.get('codeCoupon');
    return code?.value;
  }
  get typeCoupon() {
    const type = this.form.get('typeCoupon');
    return type?.value;
  }
  get valueCoupon() {
    const valueC = this.form.get('valueCoupon');
    return valueC?.value;
  }
  get limitCoupon() {
    const limit = this.form.get('limitCoupon');
    return limit?.value;
  }

  set codeCoupon(code: string) {
    this.form.get('codeCoupon')?.setValue(code);
  }
  set typeCoupon(type: string) {
    this.form.get('typeCoupon')?.setValue(type);
  }
  set valueCoupon(value: number) {
    this.form.get('valueCoupon')?.setValue(value);
  }
  set limitCoupon(limit: number) {
    this.form.get('limitCoupon')?.setValue(limit);
  }
}
