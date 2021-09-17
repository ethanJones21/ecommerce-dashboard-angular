import { FormGroup } from '@angular/forms';
import { categItf } from './setting.interface';
export class SettingClass {
  title: string;
  categories: categItf[];
  logo: string;
  serie: number;
  correlative: string;

  constructor(form: FormGroup) {
    const {
      titleSetting: title,
      categoriesSetting: categories,
      logoSetting: logo,
      serieSetting: serie,
      correlativeSetting: correlative,
    } = form.value;
    this.title = title;
    this.categories = categories;
    this.logo = logo;
    this.serie = serie;
    this.correlative = correlative;
  }
}
