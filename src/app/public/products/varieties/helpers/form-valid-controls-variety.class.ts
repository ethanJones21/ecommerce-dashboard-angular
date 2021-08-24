import { FormGroup } from '@angular/forms';
export class formValidControlsVariety {
  constructor(private form: FormGroup) {}

  get titleVariety() {
    const title = this.form.get('titleVariety');
    return title?.invalid && title?.touched && title?.dirty;
  }
  get unitsVariety() {
    const units = this.form.get('unitsVariety');
    return units?.invalid && units?.touched && units?.dirty;
  }
}
