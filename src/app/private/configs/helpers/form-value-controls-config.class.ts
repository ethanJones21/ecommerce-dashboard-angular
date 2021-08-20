import { FormArray, FormGroup } from '@angular/forms';
export class formValueControlsConfig {
  constructor(private form: FormGroup) {}

  get titleConfig() {
    const title = this.form.get('titleConfig');
    return title?.value;
  }
  // TODO: ACA NO SE COMO VA
  get categoriesConfig() {
    const categories = this.form.get('categoriesConfig');
    return categories?.value;
  }
  get categories() {
    const categories = this.form.get('categoriesConfig');
    return categories as FormArray;
  }
  get serieConfig() {
    const serie = this.form.get('serieConfig');
    return serie?.value;
  }
  get limitConfig() {
    const limit = this.form.get('limitConfig');
    return limit?.value;
  }

  set titleConfig(title: string) {
    this.form.get('titleConfig')?.setValue(title);
  }
  set categoriesConfig(categories: string) {
    this.form.get('categoriesConfig')?.setValue(categories);
  }
  set valueConfig(value: number) {
    this.form.get('valueConfig')?.setValue(value);
  }
  set limitConfig(limit: number) {
    this.form.get('limitConfig')?.setValue(limit);
  }
}
