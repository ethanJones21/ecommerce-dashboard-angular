import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValueControlsClient } from './class/form-value-controls-client.class';
import { formValidControlsClient } from './class/form-valid-controls.class';
import { formErrorsControlsClient } from './class/form-errors-controls-client.class';

@Component({
  selector: 'Client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  clientForm!: FormGroup;
  valueCC!: formValueControlsClient;
  validCC!: formValidControlsClient;
  errorsCC!: formErrorsControlsClient;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {}

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
      phoneClient: [''],
      passClient: ['', [Validators.required, Validators.minLength(5)]],
      countryClient: ['Peru', Validators.required],
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsClient(this.clientForm);
    this.validCC = new formValidControlsClient(this.clientForm);
    this.errorsCC = new formErrorsControlsClient(this.clientForm);
  }

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
      console.log(form);
    }
  }

  reset() {
    this.clientForm.reset({
      nameClient: '',
      lastnameClient: '',
      phoneClient: '',
      passClient: '',
    });
  }
}
