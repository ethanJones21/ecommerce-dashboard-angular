import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  constructor() {}

  setNewSetting(form: FormGroup, setting: any) {
    const { title, categories, logo, serie, correlative } = setting;
    form.setValue({
      titleSetting: title,
      categoriesSetting: categories,
      logoSetting: logo,
      serieSetting: serie,
      correlativeSetting: correlative,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      titleSetting: '',
      logoSetting: '',
      serieSetting: '01',
      correlativeSetting: '0001',
    });
  }
}
