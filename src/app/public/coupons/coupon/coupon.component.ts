import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formValueControlsCoupon } from '../helpers/form-value-controls-coupon.class';
import { formValidControlsCoupon } from '../helpers/form-valid-controls-coupon.class';
import { formErrorsControlsCoupon } from '../helpers/form-errors-controls-coupon.class';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponsService } from '../coupons.service';
import { CouponClass } from '../models/coupon.class';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { CouponService } from './coupon.service';
import { Subscription } from 'rxjs';
import { FormConditions } from 'src/app/shared/helpers/form-conditions.class';
import { nanoid } from 'nanoid';

@Component({
  selector: 'Coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit, OnDestroy {
  isUpdate = false;
  id = '';
  couponForm!: FormGroup;
  valueCC!: formValueControlsCoupon;
  validCC!: formValidControlsCoupon;
  errorsCC!: formErrorsControlsCoupon;

  routeInit = '/panel/coupons';
  fc = new FormConditions(this.router);

  subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private couponsServ: CouponsService,
    private couponServ: CouponService,
    private validServ: ValidatorsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.newCoupon();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  newCoupon() {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id != 'new') {
        this.subs.add(
          this.couponsServ.getCoupon(id).subscribe((coupon) => {
            this.couponServ.setNewCoupon(this.couponForm, coupon);
            this.isUpdate = true;
          })
        );
      }
    });
  }

  initForm() {
    this.couponForm = this.fb.group({
      codeCoupon: ['', [Validators.required, Validators.minLength(2)]],
      typeCoupon: [
        'Valor Fijo',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.validServ.onlyString),
        ],
      ],
      valueCoupon: [
        '',
        [Validators.required, Validators.pattern(this.validServ.onlyNumber)],
      ],
      limitCoupon: [
        '',
        [Validators.required, Validators.pattern(this.validServ.onlyNumber)],
      ],
    });
    this.initControls();
  }

  generateCode() {
    this.valueCC.codeCoupon = nanoid().toUpperCase().substr(0, 8);
  }

  private initControls() {
    this.valueCC = new formValueControlsCoupon(this.couponForm);
    this.validCC = new formValidControlsCoupon(this.couponForm);
    this.errorsCC = new formErrorsControlsCoupon(this.couponForm);
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.couponServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.couponServ.reset(form);
        }
      });
    } else {
      const coupon = new CouponClass(form);
      if (this.id === 'new') {
        this.couponsServ
          .createCoupon(coupon)
          .subscribe(({ ok, msg, coupon }) =>
            this.fc.submitSuccess(ok, msg, coupon, this.routeInit)
          );
      } else {
        this.couponsServ
          .updateCoupon(this.id, coupon)
          .subscribe(({ ok, msg, coupon }) =>
            this.fc.submitSuccess(ok, msg, coupon, this.routeInit)
          );
      }
    }
  }
}
