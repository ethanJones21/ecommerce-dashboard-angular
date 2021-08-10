import { FormGroup } from '@angular/forms';
export class formValueControlsProduct {
  constructor(private form: FormGroup) {}

  get nameProduct() {
    const name = this.form.get('nameProduct');
    return name?.value;
  }
  get coverProduct() {
    const cover = this.form.get('coverProduct');
    return cover?.value;
  }
  get priceProduct() {
    const price = this.form.get('priceProduct');
    return price?.value;
  }
  get descriptionProduct() {
    const description = this.form.get('descriptionProduct');
    return description?.value;
  }
  get contentProduct() {
    const content = this.form.get('contentProduct');
    return content?.value;
  }

  get stockProduct() {
    const stock = this.form.get('stockProduct');
    return stock?.value;
  }
  get categoryProduct() {
    const category = this.form.get('categoryProduct');
    return category?.value;
  }
}
