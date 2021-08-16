import Swal from 'sweetalert2';
import { Router } from '@angular/router';
export class FormConditions {
  constructor(private router: Router) {}

  submitSuccess(ok: boolean, msg: string, model: any, route: string) {
    Swal.fire({
      icon: 'success',
      title: ok,
      text: `${msg} : ${model.name}`,
    });
    this.router.navigate([route]);
  }

  // por ahora solo para inventario
  submitSuccessNoRedirect(ok: boolean, msg: string, model: any) {
    Swal.fire({
      icon: 'success',
      title: ok,
      text: `${msg} : ${model.supplier}`,
    });
  }
}
