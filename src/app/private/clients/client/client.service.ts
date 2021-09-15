import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  setNewClient(form: FormGroup, client: any) {
    const { name, lastname, email, profile, country, phone, gender } = client;
    form.setValue({
      nameClient: name,
      lastnameClient: lastname,
      emailClient: email,
      passClient: '123',
      countryClient: country,
      genderClient: gender,
      phoneClient: phone,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      nameClient: '',
      lastnameClient: '',
      emailClient: '',
      passClient: '123',
      countryClient: 'Peru',
      genderClient: 'M',
    });
  }
}
