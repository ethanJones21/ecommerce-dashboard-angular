import { FormGroup } from '@angular/forms';
export class formValidControlsProduct {
  constructor(private form: FormGroup) {}

  get nameProduct() {
    const name = this.form.get('nameProduct');
    return name?.invalid && name?.touched && name?.dirty;
  }

  get coverProduct() {
    const cover = this.form.get('coverProduct');
    return cover?.invalid && cover?.touched && cover?.dirty;
  }
  get priceProduct() {
    const price = this.form.get('priceProduct');
    return price?.invalid && price?.touched && price?.dirty;
  }

  get descriptionProduct() {
    const description = this.form.get('descriptionProduct');
    return description?.invalid && description?.touched && description?.dirty;
  }
  get contentProduct() {
    const content = this.form.get('contentProduct');
    return content?.invalid && content?.touched && content?.dirty;
  }
  get stockProduct() {
    const stock = this.form.get('stockProduct');
    return stock?.invalid && stock?.touched && stock?.dirty;
  }
  get categoryProduct() {
    const category = this.form.get('categoryProduct');
    return category?.invalid && category?.touched && category?.dirty;
  }
}
