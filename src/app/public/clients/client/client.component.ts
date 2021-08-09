import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValueControlsClient } from '../helpers/form-value-controls-client.class';
import { formValidControlsClient } from '../helpers/form-valid-controls.class';
import { formErrorsControlsClient } from '../helpers/form-errors-controls-client.class';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import Swal from 'sweetalert2';
import { ClientClass } from '../models/client.class';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { ClientService } from './client.service';

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
    private clientsServ: ClientsService,
    private clientServ: ClientService,
    private validServ: ValidatorsService
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
            ({ name, lastname, email, profile, country, phone, gender }) => {
              this.id = id;
              this.clientForm.setValue({
                nameClient: name,
                lastnameClient: lastname,
                emailClient: email,
                passClient: '123',
                countryClient: country,
                genderClient: gender,
                phoneClient: phone,
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
          Validators.minLength(2),
          Validators.pattern(this.validServ.onlyString),
        ],
      ],
      lastnameClient: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.validServ.onlyString),
        ],
      ],
      emailClient: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validServ.onlyEmail),
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

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.clientServ.reset(this.clientForm);
          });
        } else {
          control.markAsTouched();
          this.clientServ.reset(this.clientForm);
        }
      });
    } else {
      const client = new ClientClass(form);
      if (this.id === 'new') {
        this.clientsServ
          .createClient(client)
          .subscribe(({ ok, msg, client }) => {
            Swal.fire({
              icon: 'success',
              title: ok,
              text: `${msg} : ${client.name}`,
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
              text: `${msg} : ${client.name}`,
            });
            this.goClientsPage();
          });
      }
    }
  }
}
