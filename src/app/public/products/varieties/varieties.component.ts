import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormConditions } from '../../../shared/helpers/form-conditions.class';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formValueControlsVariety } from './helpers/form-value-controls-variety.class';
import { formValidControlsVariety } from './helpers/form-valid-controls-variety.class';
import { formErrorsControlsVariety } from './helpers/form-errors-controls-variety.class';
import { VarietiesService } from './varieties.service';
import { VarietyClass } from './models/variety.class';

@Component({
  selector: 'Varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.scss'],
})
export class VarietiesComponent implements OnInit, OnDestroy {
  isUpdate = false;
  nameProduct = this.varietiesServ.nameProduct;
  fc = new FormConditions(this.router);
  varietyID = '';
  productID = '';
  subs = new Subscription();
  varietyForm!: FormGroup;
  valueCC!: formValueControlsVariety;
  validCC!: formValidControlsVariety;
  errorsCC!: formErrorsControlsVariety;

  varieties$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private varietiesServ: VarietiesService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initID();
    this.initVariety();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initID() {
    this.route.params.subscribe(
      ({ productID }) => (this.productID = productID)
    );
  }

  selectVariety(variety: { id: string; title: string; units: any[] }) {
    this.varietyID = variety.id;
    this.varietiesServ.setNewVariety(variety, this.valueCC);
    this.isUpdate = true;
  }

  initVariety() {
    this.varieties$ = this.varietiesServ.getVarieties(this.productID);
    this.subs.add(this.varieties$.subscribe());
  }

  initForm() {
    this.varietyForm = this.fb.group({
      titleVariety: ['', Validators.required],
      unitsVariety: this.fb.array([]),
    });
    this.initControls();
  }

  private initControls() {
    this.valueCC = new formValueControlsVariety(this.varietyForm);
    this.validCC = new formValidControlsVariety(this.varietyForm);
    this.errorsCC = new formErrorsControlsVariety(this.varietyForm);
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control: any) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.varietiesServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.varietiesServ.reset(form);
        }
      });
    } else {
      const variety = new VarietyClass(form, this.varietyID);
      if (this.isUpdate) {
        this.varietiesServ
          .updateVariety(this.productID, variety)
          .subscribe(({ ok, msg, product }) => {
            this.fc.submitSuccessNoRedirect(ok, msg, product);
            this.initVariety();
            this.varietiesServ.reset(form);
            this.isUpdate = false;
          });
      } else {
        this.varietiesServ
          .createVariety(this.productID, variety)
          .subscribe(({ ok, msg, product }) => {
            this.fc.submitSuccessNoRedirect(ok, msg, product);
            this.initVariety();
            this.varietiesServ.reset(form);
          });
      }
    }
  }

  resetAll() {
    this.varietiesServ.reset(this.varietyForm);
    this.isUpdate = false;
  }

  deleteUnit(i: number) {
    this.valueCC.units.removeAt(i);
  }

  addVariety() {
    // this.varietiesServ.addVariety(this.valueCC, this.fb, '');
    this.varietiesServ.addVariety(this.valueCC, '');
  }

  deleteVariety(varietyID: string) {
    this.varietiesServ
      .deleteVariety(this.productID, varietyID)
      .subscribe(({ ok, msg }) => {
        this.fc.submitSuccessNoRedirect(ok, msg);
        this.initVariety();
      });
  }
}
