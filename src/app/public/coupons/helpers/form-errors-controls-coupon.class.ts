import { FormGroup } from '@angular/forms';
export class formErrorsControlsCoupon {
  constructor(private form: FormGroup) {}

  get codeCoupon() {
    const code = this.form.get('codeCoupon')?.errors || {};
    return this.setErrorCondition(code, 'codigo');
  }
  get typeCoupon() {
    const type = this.form.get('typeCoupon')?.errors || {};
    return this.setErrorCondition(type, 'tipo');
  }
  get valueCoupon() {
    const value = this.form.get('valueCoupon')?.errors || {};
    return this.setErrorCondition(value, 'valor');
  }

  get limitCoupon() {
    const limit = this.form.get('limitCoupon')?.errors || {};
    return this.setErrorCondition(limit, 'limite');
  }

  private setErrorCondition(obj: any, campo: string) {
    const reqLength =
      obj?.minlength?.requiredLength || obj?.maxlength?.requiredLength || '';
    const condition = Object.keys(obj)[0];
    const ERRORS: any = {
      required: 'Este campo es requerido',
      minlength: `Este campo tiene un tamaño minimo de ${reqLength}`,
      maxlength: `Este campo tiene un tamaño maximo de ${reqLength}`,
      pattern: `Coloque un(a) ${campo} valido(a)`,
    };
    return ERRORS[condition];
  }
}
