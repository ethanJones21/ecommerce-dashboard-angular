import { FormGroup } from '@angular/forms';
export class formErrorsControlsConfig {
  constructor(private form: FormGroup) {}

  get titleConfig() {
    const title = this.form.get('titleConfig')?.errors || {};
    return this.setErrorCondition(title, 'titulo');
  }

  get categoriesConfig() {
    const categories = this.form.get('categoriesConfig')?.errors || {};
    return this.setErrorCondition(categories, 'categorias');
  }

  get serieConfig() {
    const serie = this.form.get('serieConfig')?.errors || {};
    return this.setErrorCondition(serie, 'serie');
  }
  get correlativeConfig() {
    const correlative = this.form.get('correlativeConfig')?.errors || {};
    return this.setErrorCondition(correlative, 'correlativo');
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
