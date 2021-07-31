import { FormGroup } from '@angular/forms';
export class formErrorsControlsClient {
  constructor(private form: FormGroup) {}

  get nameClient() {
    const name = this.form.get('nameClient')?.errors || {};
    return this.setErrorCondition(name, 'nombre');
  }
  get lastnameClient() {
    const lastname = this.form.get('lastnameClient')?.errors || {};
    return this.setErrorCondition(lastname, 'apellido');
  }
  get emailClient() {
    const email = this.form.get('emailClient')?.errors || {};
    return this.setErrorCondition(email, 'correo');
  }

  get phoneClient() {
    const phone = this.form.get('phoneClient')?.errors || {};
    return this.setErrorCondition(phone, 'telefono');
  }
  get genderClient() {
    const gender = this.form.get('genderClient')?.errors || {};
    return this.setErrorCondition(gender, 'telefono');
  }
  get countryClient() {
    const country = this.form.get('countryClient')?.errors || {};
    return this.setErrorCondition(country, 'telefono');
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
