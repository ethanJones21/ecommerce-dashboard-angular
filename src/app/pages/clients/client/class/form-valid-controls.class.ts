import { FormGroup } from '@angular/forms';
export class formValidControlsClient {
  constructor(private form: FormGroup) {}

  get nameClient() {
    const name = this.form.get('nameClient');
    return name?.invalid && name?.touched && name?.dirty;
  }
  get lastnameClient() {
    const lastname = this.form.get('lastnameClient');
    return lastname?.invalid && lastname?.touched && lastname?.dirty;
  }
  get emailClient() {
    const email = this.form.get('emailClient');
    return email?.invalid && email?.touched && email?.dirty;
  }
  get passClient() {
    const pass = this.form.get('passClient');
    return pass?.invalid && pass?.touched && pass?.dirty;
  }
  get phoneClient() {
    const phone = this.form.get('phoneClient');
    return phone?.invalid && phone?.touched && phone?.dirty;
  }
  get countryClient() {
    const country = this.form.get('countryClient');
    return country?.invalid && country?.touched && country?.dirty;
  }
}
