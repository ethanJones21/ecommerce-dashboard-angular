import { FormGroup } from '@angular/forms';
export class formValidControlsInventory {
  constructor(private form: FormGroup) {}

  get supplierInventory() {
    const supplier = this.form.get('supplierInventory');
    return supplier?.invalid && supplier?.touched && supplier?.dirty;
  }

  get totalInventory() {
    const total = this.form.get('totalInventory');
    return total?.invalid && total?.touched && total?.dirty;
  }
}
