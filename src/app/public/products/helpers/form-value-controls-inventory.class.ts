import { FormGroup } from '@angular/forms';
export class formValueControlsInventory {
  constructor(private form: FormGroup) {}

  get supplierInventory() {
    const supplier = this.form.get('supplierInventory');
    return supplier?.value;
  }

  get totalInventory() {
    const total = this.form.get('totalInventory');
    return total?.value;
  }
}
