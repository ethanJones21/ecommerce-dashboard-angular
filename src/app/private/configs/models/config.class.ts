import { FormGroup } from '@angular/forms';
import { categItf } from './config.interface';
export class ConfigClass {
  title: string;
  categories: categItf[];
  logo: string;
  serie: number;
  correlative: string;

  constructor(form: FormGroup) {
    const {
      titleConfig: title,
      categoriesConfig: categories,
      logoConfig: logo,
      serieConfig: serie,
      correlativeConfig: correlative,
    } = form.value;
    this.title = title;
    this.categories = categories;
    this.logo = logo;
    this.serie = serie;
    this.correlative = correlative;
  }
}
