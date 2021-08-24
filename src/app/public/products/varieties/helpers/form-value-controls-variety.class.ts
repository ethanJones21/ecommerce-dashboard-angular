import { FormArray, FormControl, FormGroup } from '@angular/forms';
export class formValueControlsVariety {
  constructor(private form: FormGroup) {}

  get titleVariety() {
    const title = this.form.get('titleVariety');
    return title?.value;
  }

  get units() {
    const units = this.form.get('unitsVariety');
    return units as FormArray;
  }

  set titleVariety(title: string) {
    this.form.get('titleVariety')?.setValue(title);
  }
}
