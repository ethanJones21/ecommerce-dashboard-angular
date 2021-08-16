import { FormGroup } from '@angular/forms';
export class formErrorsControlsInventory {
  constructor(private form: FormGroup) {}

  get supplierInventory() {
    const supplier = this.form.get('supplierInventory')?.errors || {};
    return this.setErrorCondition(supplier, 'proveedor');
  }

  get totalInventory() {
    const total = this.form.get('totalInventory')?.errors || {};
    return this.setErrorCondition(total, 'proveedor');
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
