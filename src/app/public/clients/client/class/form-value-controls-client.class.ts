import { FormGroup } from '@angular/forms';
export class formValueControlsClient {
  constructor(private form: FormGroup) {}

  get nameClient() {
    const name = this.form.get('nameClient');
    return name?.value;
  }
  get lastnameClient() {
    const lastname = this.form.get('lastnameClient');
    return lastname?.value;
  }
  get emailClient() {
    const email = this.form.get('emailClient');
    return email?.value;
  }
  get genderClient() {
    const gender = this.form.get('genderClient');
    return gender?.value;
  }
  get countryClient() {
    const country = this.form.get('countryClient');
    return country?.value;
  }

  get phoneClient() {
    const phone = this.form.get('phoneClient');
    return phone?.value;
  }
  get passClient() {
    const pass = this.form.get('passClient');
    return pass?.value;
  }
  get perfilClient() {
    const perfil = this.form.get('perfilClient');
    return perfil?.value;
  }
}
