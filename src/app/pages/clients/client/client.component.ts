import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValueControlsClient } from './class/form-value-controls-client.class';
import { formValidControlsClient } from './class/form-valid-controls.class';
import { formErrorsControlsClient } from './class/form-errors-controls-client.class';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../services/clients.service';
import Swal from 'sweetalert2';
import { ClientClass, ClientItf } from './models/client';

@Component({
  selector: 'Client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  id = '';
  clientForm!: FormGroup;
  valueCC!: formValueControlsClient;
  validCC!: formValidControlsClient;
  errorsCC!: formErrorsControlsClient;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientsServ: ClientsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.updateOrNewClient();
  }

  updateOrNewClient() {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id != 'new') {
        this.clientsServ
          .getClient(id)
          .subscribe(
            ({ nombre, apellido, email, perfil, pais, telefono, genero }) => {
              this.id = id;
              this.clientForm.setValue({
                nameClient: nombre,
                lastnameClient: apellido,
                emailClient: email,
                passClient: '123',
                countryClient: pais,
                genderClient: genero,
                phoneClient: telefono,
              });
            }
          );
      }
    });
  }

  initForm() {
    this.clientForm = this.fb.group({
      nameClient: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z_ ]*$'),
        ],
      ],
      lastnameClient: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[a-zA-Z_ ]*$'),
        ],
      ],
      emailClient: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      passClient: ['123'],
      countryClient: ['Peru', Validators.required],
      genderClient: ['', Validators.required],
      phoneClient: [''],
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsClient(this.clientForm);
    this.validCC = new formValidControlsClient(this.clientForm);
    this.errorsCC = new formErrorsControlsClient(this.clientForm);
  }

  goClientsPage() {
    this.router.navigate(['/panel/clients']);
  }

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.clientForm.patchValue({
  //       perfilClient: file,
  //     });
  //   }
  // }

  // onFileChange(event: any) {
  //   let reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.clientForm.patchValue({
  //         perfilClient: reader.result,
  //       });
  //     };
  //   }
  // }

  submitForm(form: FormGroup) {
    if (this.clientForm.invalid) {
      return Object.values(this.clientForm.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.reset();
          });
        } else {
          control.markAsTouched();
          this.reset();
        }
      });
    } else {
      const client = this.formatClient(form);
      if (this.id === 'new') {
        this.clientsServ
          .createClient(client)
          .subscribe(({ ok, msg, client }) => {
            Swal.fire({
              icon: 'success',
              title: ok,
              text: `${msg} : ${client.nombre}`,
            });
            this.goClientsPage();
          });
      } else {
        delete client.password;
        this.clientsServ
          .updateClient(this.id, client)
          .subscribe(({ ok, msg, client }) => {
            Swal.fire({
              icon: 'success',
              title: ok,
              text: `${msg} : ${client.nombre}`,
            });
            this.goClientsPage();
          });
      }
    }
  }

  formatClient(form: FormGroup) {
    const {
      nameClient,
      lastnameClient,
      emailClient,
      countryClient,
      genderClient,
      ...other
    } = form.value;
    return new ClientClass(
      nameClient,
      lastnameClient,
      emailClient,
      countryClient,
      genderClient,
      other
    );
  }

  reset() {
    this.clientForm.reset({
      nameClient: '',
      lastnameClient: '',
      emailClient: '',
      passClient: '123',
      countryClient: 'Peru',
      genderClient: 'M',
    });
  }
}
