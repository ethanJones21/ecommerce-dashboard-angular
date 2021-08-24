import { FormGroup } from '@angular/forms';
import { nanoid } from 'nanoid';
export class VarietyClass {
  id?: string;
  title: string;
  units: any[];

  constructor(form: FormGroup, id: string) {
    const { titleVariety: title, unitsVariety: units } = form.value;
    id ? (this.id = id) : (this.id = nanoid());
    this.title = title;
    this.units = units;
  }
}
