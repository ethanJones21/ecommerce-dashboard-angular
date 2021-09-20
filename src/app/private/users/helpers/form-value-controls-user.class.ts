import { FormGroup } from '@angular/forms';
export class formValueControlsUser {
  constructor(private form: FormGroup) {}

  get nameUser() {
    const name = this.form.get('nameUser');
    return name?.value;
  }
  get lastnameUser() {
    const lastname = this.form.get('lastnameUser');
    return lastname?.value;
  }
  get emailUser() {
    const email = this.form.get('emailUser');
    return email?.value;
  }
  get genderUser() {
    const gender = this.form.get('genderUser');
    return gender?.value;
  }
  get countryUser() {
    const country = this.form.get('countryUser');
    return country?.value;
  }
  get roleUser() {
    const role = this.form.get('roleUser');
    return role?.value;
  }

  get phoneUser() {
    const phone = this.form.get('phoneUser');
    return phone?.value;
  }
  get passUser() {
    const pass = this.form.get('passUser');
    return pass?.value;
  }
  get perfilUser() {
    const perfil = this.form.get('perfilUser');
    return perfil?.value;
  }
}
