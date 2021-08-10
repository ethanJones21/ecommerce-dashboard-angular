import { FormGroup } from '@angular/forms';
export class formErrorsControlsProduct {
  constructor(private form: FormGroup) {}

  get nameProduct() {
    const name = this.form.get('nameProduct')?.errors || {};
    return this.setErrorCondition(name, 'nombre');
  }
  get coverProduct() {
    const cover = this.form.get('coverProduct')?.errors || {};
    return this.setErrorCondition(cover, 'cover');
  }
  get priceProduct() {
    const price = this.form.get('priceProduct')?.errors || {};
    return this.setErrorCondition(price, 'precio');
  }

  get descriptionProduct() {
    const description = this.form.get('descriptionProduct')?.errors || {};
    return this.setErrorCondition(description, 'descripcion');
  }
  get contentProduct() {
    const content = this.form.get('contentProduct')?.errors || {};
    return this.setErrorCondition(content, 'contenido');
  }
  get stockProduct() {
    const stock = this.form.get('stockProduct')?.errors || {};
    return this.setErrorCondition(stock, 'stock');
  }
  get categoryProduct() {
    const category = this.form.get('categoryProduct')?.errors || {};
    return this.setErrorCondition(category, 'categoria');
  }

  private setErrorCondition(obj: any, campo: string) {
    const reqLength =
      obj?.minlength?.requiredLength || obj?.maxlength?.requiredLength || '';
    const condition = Object.keys(obj)[0];
    const ERRORS: any = {
      required: 'Este campo es requerido',
      minlength: `Este campo tiene un tamaño minimo de ${reqLength}`,
      maxlength: `Este campo tiene un tamaño maximo de ${reqLength}`,
      pattern: `Coloque un(a) ${campo} valido(a)`,
    };
    return ERRORS[condition];
  }
}
