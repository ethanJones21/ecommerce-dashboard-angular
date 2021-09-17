import { FormGroup } from '@angular/forms';
export class formValidControlsSetting {
  constructor(private form: FormGroup) {}

  get titleSetting() {
    const title = this.form.get('titleSetting');
    return title?.invalid && title?.touched && title?.dirty;
  }

  get categoriesSetting() {
    const categories = this.form.get('categoriesSetting');
    return categories?.invalid && categories?.touched && categories?.dirty;
  }
  get serieSetting() {
    const serie = this.form.get('serieSetting');
    return serie?.invalid && serie?.touched && serie?.dirty;
  }

  get correlativeSetting() {
    const correlative = this.form.get('correlativeSetting');
    return correlative?.invalid && correlative?.touched && correlative?.dirty;
  }
}
