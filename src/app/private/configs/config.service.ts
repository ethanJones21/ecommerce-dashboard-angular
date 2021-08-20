import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  setNewConfig(form: FormGroup, config: any) {
    const { title, categories, logo, serie, correlative } = config;
    form.setValue({
      titleConfig: title,
      categoriesConfig: categories,
      logoConfig: logo,
      serieConfig: serie,
      correlativeConfig: correlative,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      titleConfig: '',
      logoConfig: '',
      serieConfig: '01',
      correlativeConfig: '0001',
    });
  }
}
