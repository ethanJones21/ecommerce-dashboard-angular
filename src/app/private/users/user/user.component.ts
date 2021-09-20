import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formValueControlsUser } from '../helpers/form-value-controls-user.class';
import { formValidControlsUser } from '../helpers/form-valid-controls-user.class';
import { formErrorsControlsUser } from '../helpers/form-errors-controls-user.class';
import { FormConditions } from '../../../shared/helpers/form-conditions.class';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from './userData.service';
import { UsersDataService } from '../usersData.service';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { UserClass } from '../models/user.class';

@Component({
  selector: 'User',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isUpdate = false;
  id = '';
  userForm!: FormGroup;
  valueCC!: formValueControlsUser;
  validCC!: formValidControlsUser;
  errorsCC!: formErrorsControlsUser;

  routeInit = '/panel/admins/users';
  fc = new FormConditions(this.router);

  subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersDataServ: UsersDataService,
    private userDataServ: UserDataService,
    private validServ: ValidatorsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.newUser();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  newUser() {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id != 'new') {
        this.subs.add(
          this.usersDataServ.getUser(id).subscribe((user) => {
            this.userDataServ.setNewUser(this.userForm, user);
            this.isUpdate = true;
          })
        );
      }
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      nameUser: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(this.validServ.onlyString),
        ],
      ],
      lastnameUser: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.validServ.onlyString),
        ],
      ],
      emailUser: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.validServ.onlyEmail),
        ],
      ],
      passUser: ['', [Validators.required, Validators.minLength(8)]],
      countryUser: ['Peru', Validators.required],
      genderUser: ['', Validators.required],
      phoneUser: [''],
      roleUser: ['USER', Validators.required],
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsUser(this.userForm);
    this.validCC = new formValidControlsUser(this.userForm);
    this.errorsCC = new formErrorsControlsUser(this.userForm);
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.userDataServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.userDataServ.reset(form);
        }
      });
    } else {
      const user = new UserClass(form);
      if (this.id === 'new') {
        this.usersDataServ
          .createUser(user)
          .subscribe(({ ok, msg, user }) =>
            this.fc.submitSuccess(ok, msg, user, this.routeInit)
          );
      } else {
        this.usersDataServ
          .updateUser(this.id, user)
          .subscribe(({ ok, msg, user }) =>
            this.fc.submitSuccess(ok, msg, user, this.routeInit)
          );
      }
    }
  }
}
