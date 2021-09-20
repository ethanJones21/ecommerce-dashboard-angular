import { FormGroup } from '@angular/forms';
export class formErrorsControlsUser {
  constructor(private form: FormGroup) {}

  get nameUser() {
    const name = this.form.get('nameUser')?.errors || {};
    return this.setErrorCondition(name, 'nombre');
  }
  get lastnameUser() {
    const lastname = this.form.get('lastnameUser')?.errors || {};
    return this.setErrorCondition(lastname, 'apellido');
  }
  get emailUser() {
    const email = this.form.get('emailUser')?.errors || {};
    return this.setErrorCondition(email, 'correo');
  }

  get phoneUser() {
    const phone = this.form.get('phoneUser')?.errors || {};
    return this.setErrorCondition(phone, 'telefono');
  }
  get genderUser() {
    const gender = this.form.get('genderUser')?.errors || {};
    return this.setErrorCondition(gender, 'genero');
  }
  get passUser() {
    const pass = this.form.get('passUser')?.errors || {};
    return this.setErrorCondition(pass, 'contraseña');
  }
  get roleUser() {
    const role = this.form.get('roleUser')?.errors || {};
    return this.setErrorCondition(role, 'role');
  }
  get countryUser() {
    const country = this.form.get('countryUser')?.errors || {};
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
