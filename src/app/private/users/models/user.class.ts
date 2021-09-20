import { FormGroup } from '@angular/forms';

export class UserClass {
  // necessary
  name = '';
  lastname = '';
  email = '';
  country = '';
  gender = '';
  role = 'USER';
  //   ?
  password = '';
  perfil = '';
  phone = '';
  birthday = '';
  dni = '';
  active = true;

  constructor(form: FormGroup) {
    const {
      nameUser: name,
      lastnameUser: lastname,
      emailUser: email,
      passUser: pass,
      countryUser: country,
      genderUser: gender,
      roleUser: role,
      ...other
    } = form.value;
    //   necessary
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = pass;
    this.country = country;
    this.gender = gender;
    this.role = role;
    // ?
    this.fillOtherFields(other);
  }

  fillOtherFields(other: any) {
    const { perfilUser: perfil, phoneUser: phone, activeUser: active } = other;
    this.perfil = perfil || '';
    this.phone = phone || '';
    this.active = active || true;
  }
}
