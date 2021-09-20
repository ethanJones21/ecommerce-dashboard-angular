import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  setNewUser(form: FormGroup, user: any) {
    const { name, lastname, email, profile, country, phone, gender, role } =
      user;
    form.setValue({
      nameUser: name,
      lastnameUser: lastname,
      emailUser: email,
      passUser: 'nopassword',
      countryUser: country,
      genderUser: gender,
      phoneUser: phone,
      roleUser: role,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      nameUser: '',
      lastnameUser: '',
      emailUser: '',
      passUser: '123',
      countryUser: 'Peru',
      genderUser: 'M',
      roleUser: 'USER',
    });
  }
}
