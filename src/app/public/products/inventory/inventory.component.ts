import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { InventoryItf } from '../models/inventory.interface';
import { InventoryService } from './inventory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { InventoryClass } from '../models/inventory.class';
import { FormConditions } from '../../../shared/helpers/form-conditions.class';
import { formValueControlsInventory } from '../helpers/form-value-controls-inventory.class';
import { formValidControlsInventory } from '../helpers/form-valid-controls-inventory.class';
import { formErrorsControlsInventory } from '../helpers/form-errors-controls-inventory.class';

@Component({
  selector: 'Inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  valueCC!: formValueControlsInventory;
  validCC!: formValidControlsInventory;
  errorsCC!: formErrorsControlsInventory;

  fc = new FormConditions(this.router);

  inventoryUpdateID = '';
  isUpdate = false;
  @ViewChild('inputTotalInventory') inputTotalInventory!: ElementRef;
  inventoryForm!: FormGroup;
  nameProduct = this.inventoryServ.nameProduct;
  productID = '';
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  inventories$!: Observable<InventoryItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(
    private inventoryServ: InventoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private validatorsServ: ValidatorsService,
    private render: Renderer2,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initID();
    this.getInventories('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    localStorage.removeItem('nameProduct');
  }

  initID() {
    this.route.params.subscribe(
      ({ productID }) => (this.productID = productID)
    );
  }

  private initControls() {
    this.valueCC = new formValueControlsInventory(this.inventoryForm);
    this.validCC = new formValidControlsInventory(this.inventoryForm);
    this.errorsCC = new formErrorsControlsInventory(this.inventoryForm);
  }

  initForm() {
    this.inventoryForm = this.fb.group({
      supplierInventory: ['', [Validators.required]],
      totalInventory: [
        0,
        [
          Validators.required,
          Validators.pattern(this.validatorsServ.onlyNumber),
        ],
      ],
    });
    this.initControls();
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.inventoryServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.inventoryServ.reset(form);
        }
      });
    } else {
      const inventory = new InventoryClass(form);
      if (this.isUpdate) {
        this.inventoryServ
          .updateInventory(this.inventoryUpdateID, inventory)
          .subscribe(({ ok, msg, inventory }) => {
            this.fc.submitSuccessNoRedirect(ok, msg, inventory);
            this.getInventories('', 1);
            this.isUpdate = false;
            this.inventoryServ.reset(form);
            this.render.setProperty(
              this.inputTotalInventory.nativeElement,
              'disabled',
              'false'
            );
          });
      } else {
        this.inventoryServ
          .createInventory(this.productID, inventory)
          .subscribe(({ ok, msg, inventory }) => {
            this.fc.submitSuccessNoRedirect(ok, msg, inventory);
            this.inventoryServ.reset(form);
            this.getInventories('', 1);
          });
      }
    }
  }

  search(termino: string): void {
    return this.getInventories(termino, 1);
  }

  getInventories(term: any, page: number) {
    this.term = term;
    this.inventories$ = this.inventoryServ
      .getInventories(this.productID, term, page, this.limit)
      .pipe(
        //prueba de que carge skeleton-load
        // delay(3000),
        map(({ inventories, ...data }) => {
          this.pagination = { ...data, limit: this.limit };
          return inventories;
        })
      );
    this.subs.add(this.inventories$.subscribe());
  }

  updateInventory(inventory: InventoryItf) {
    const {
      id,
      supplier: supplierInventory,
      total: totalInventory,
    } = inventory;
    this.inventoryForm.setValue({
      supplierInventory,
      totalInventory,
    });
    this.render.setProperty(
      this.inputTotalInventory.nativeElement,
      'disabled',
      'true'
    );
    this.isUpdate = true;
    this.inventoryUpdateID = id;
  }

  deleteInventory(id: string) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este inventario?',
      text: 'Si continua este inventario se eliminara restandolo del stock del producto',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.inventoryServ.deleteInventory(id).subscribe(({ ok, msg }) => {
          Swal.fire({
            icon: 'success',
            title: `ok: ${ok}`,
            text: msg,
          });
          this.getInventories('', 1);
        });
      }
    });
  }
}
