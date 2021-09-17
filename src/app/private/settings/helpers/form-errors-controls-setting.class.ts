import { FormGroup } from '@angular/forms';
export class formErrorsControlsSetting {
  constructor(private form: FormGroup) {}

  get titleSetting() {
    const title = this.form.get('titleSetting')?.errors || {};
    return this.setErrorCondition(title, 'titulo');
  }

  get categoriesSetting() {
    const categories = this.form.get('categoriesSetting')?.errors || {};
    return this.setErrorCondition(categories, 'categorias');
  }

  get serieSetting() {
    const serie = this.form.get('serieSetting')?.errors || {};
    return this.setErrorCondition(serie, 'serie');
  }
  get correlativeSetting() {
    const correlative = this.form.get('correlativeSetting')?.errors || {};
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
