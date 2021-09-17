import { FormArray, FormGroup } from '@angular/forms';
export class formValueControlsSetting {
  constructor(private form: FormGroup) {}

  get titleSetting() {
    const title = this.form.get('titleSetting');
    return title?.value;
  }
  // TODO: ACA NO SE COMO VA
  get categoriesSetting() {
    const categories = this.form.get('categoriesSetting');
    return categories?.value;
  }
  get categories() {
    const categories = this.form.get('categoriesSetting');
    return categories as FormArray;
  }
  get serieSetting() {
    const serie = this.form.get('serieSetting');
    return serie?.value;
  }
  get limitSetting() {
    const limit = this.form.get('limitSetting');
    return limit?.value;
  }

  set titleSetting(title: string) {
    this.form.get('titleSetting')?.setValue(title);
  }
  set categoriesSetting(categories: string) {
    this.form.get('categoriesSetting')?.setValue(categories);
  }
  set valueSetting(value: number) {
    this.form.get('valueSetting')?.setValue(value);
  }
  set limitSetting(limit: number) {
    this.form.get('limitSetting')?.setValue(limit);
  }
}
