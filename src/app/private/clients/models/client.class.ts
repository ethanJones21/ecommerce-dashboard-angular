import { FormGroup } from '@angular/forms';

export class ClientClass {
  // necessary
  name = '';
  lastname = '';
  email = '';
  country = '';
  gender = '';
  test = true;
  //   ?
  password? = '123';
  perfil = '';
  phone = '';
  birthday = '';
  dni = '';
  active = true;

  constructor(form: FormGroup) {
    const {
      nameClient: name,
      lastnameClient: lastname,
      emailClient: email,
      countryClient: country,
      genderClient: gender,
      ...other
    } = form.value;
    //   necessary
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.country = country;
    this.gender = gender;
    // ?
    this.fillOtherFields(other);
  }

  fillOtherFields(other: any) {
    const {
      perfilClient: perfil,
      phoneClient: phone,
      activeClient: active,
    } = other;
    this.perfil = perfil || '';
    this.phone = phone || '';
    this.active = active || true;
  }
}
