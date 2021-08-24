import { FormGroup } from '@angular/forms';
export class formErrorsControlsVariety {
  constructor(private form: FormGroup) {}

  get titleVariety() {
    const title = this.form.get('titleVariety')?.errors || {};
    return this.setErrorCondition(title, 'titulo');
  }
  get unitsVariety() {
    const units = this.form.get('unitsVariety')?.errors || {};
    return this.setErrorCondition(units, 'unidades');
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
