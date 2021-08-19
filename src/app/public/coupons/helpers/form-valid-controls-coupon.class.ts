import { FormGroup } from '@angular/forms';
export class formValidControlsCoupon {
  constructor(private form: FormGroup) {}

  get codeCoupon() {
    const code = this.form.get('codeCoupon');
    return code?.invalid && code?.touched && code?.dirty;
  }

  get typeCoupon() {
    const type = this.form.get('typeCoupon');
    return type?.invalid && type?.touched && type?.dirty;
  }
  get valueCoupon() {
    const value = this.form.get('valueCoupon');
    return value?.invalid && value?.touched && value?.dirty;
  }

  get limitCoupon() {
    const limit = this.form.get('limitCoupon');
    return limit?.invalid && limit?.touched && limit?.dirty;
  }
}
