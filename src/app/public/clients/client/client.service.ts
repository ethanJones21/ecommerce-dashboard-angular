import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor() {}

  reset(form: any) {
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
