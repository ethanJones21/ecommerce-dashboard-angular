import { FormGroup } from '@angular/forms';
export class formValidControlsUser {
  constructor(private form: FormGroup) {}

  get nameUser() {
    const name = this.form.get('nameUser');
    return name?.invalid && name?.touched && name?.dirty;
  }
  get lastnameUser() {
    const lastname = this.form.get('lastnameUser');
    return lastname?.invalid && lastname?.touched && lastname?.dirty;
  }
  get emailUser() {
    const email = this.form.get('emailUser');
    return email?.invalid && email?.touched && email?.dirty;
  }
  get passUser() {
    const pass = this.form.get('passUser');
    return pass?.invalid && pass?.touched && pass?.dirty;
  }
  get roleUser() {
    const role = this.form.get('roleUser');
    return role?.invalid && role?.touched && role?.dirty;
  }
  get genderUser() {
    const gender = this.form.get('genderUser');
    return gender?.invalid && gender?.touched && gender?.dirty;
  }

  get phoneUser() {
    const phone = this.form.get('phoneUser');
    return phone?.invalid && phone?.touched && phone?.dirty;
  }
  get countryUser() {
    const country = this.form.get('countryUser');
    return country?.invalid && country?.touched && country?.dirty;
  }
}
