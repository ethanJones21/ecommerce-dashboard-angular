import { FormGroup } from '@angular/forms';
export class formValidControlsConfig {
  constructor(private form: FormGroup) {}

  get titleConfig() {
    const title = this.form.get('titleConfig');
    return title?.invalid && title?.touched && title?.dirty;
  }

  get categoriesConfig() {
    const categories = this.form.get('categoriesConfig');
    return categories?.invalid && categories?.touched && categories?.dirty;
  }
  get serieConfig() {
    const serie = this.form.get('serieConfig');
    return serie?.invalid && serie?.touched && serie?.dirty;
  }

  get correlativeConfig() {
    const correlative = this.form.get('correlativeConfig');
    return correlative?.invalid && correlative?.touched && correlative?.dirty;
  }
}
