import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IMGTYPES } from '../../../shared/models/img-types.model';
import { ImgConditions } from '../../../shared/helpers/img-conditions.class';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductService } from './product.service';
import { formValueControlsProduct } from '../../products/helpers/form-value-controls-product.class';
import { formValidControlsProduct } from '../../products/helpers/form-valid-controls-product.class';
import { formErrorsControlsProduct } from '../../products/helpers/form-errors-controls-product.class';
import { FormConditions } from '../../../shared/helpers/form-conditions.class';
import { ProductClass } from '../models/product.class';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'Product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  isUpdate = false;
  imgTypes = IMGTYPES;
  productForm!: FormGroup;
  valueCC!: formValueControlsProduct;
  validCC!: formValidControlsProduct;
  errorsCC!: formErrorsControlsProduct;
  routeInit = '/panel/products';
  file!: File;
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  id = '';
  subs = new Subscription();
  fc = new FormConditions(this.router);

  @ViewChild('labelCoverProduct') labelCoverProduct!: ElementRef;

  config = {
    height: 500,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productsServ: ProductsService,
    private productServ: ProductService,
    private validServ: ValidatorsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.newProduct();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  newProduct() {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      if (id != 'new') {
        this.subs.add(
          this.productsServ.getProduct(id).subscribe((product) => {
            this.isUpdate = true;
            this.imgSelect = `${apiUrl}/uploads/products/${product.cover}`;
            this.productServ.setNewProduct(
              this.productForm,
              product,
              this.labelCoverProduct
            );
          })
        );
      }
    });
  }

  private initControls() {
    this.valueCC = new formValueControlsProduct(this.productForm);
    this.validCC = new formValidControlsProduct(this.productForm);
    this.errorsCC = new formErrorsControlsProduct(this.productForm);
  }

  initForm() {
    this.productForm = this.fb.group({
      nameProduct: ['', [Validators.required, Validators.min(4)]],
      priceProduct: [
        0,
        [Validators.required, Validators.pattern(this.validServ.onlyNumber)],
      ],
      descriptionProduct: ['', Validators.required],
      contentProduct: [''],
      stockProduct: [
        0,
        [Validators.required, Validators.pattern(this.validServ.onlyNumber)],
      ],
      categoryProduct: ['', Validators.required],
    });
    this.initControls();
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) => {
            control.markAsTouched();
            this.productServ.reset(form);
          });
        } else {
          control.markAsTouched();
          this.productServ.reset(form);
        }
      });
    } else {
      if (this.file && this.imgSelect != 'assets/img/01.jpg') {
        const product = new ProductClass(form);
        console.log('antes de enviar porque se perdera:' + product);
        if (this.id === 'new') {
          this.productsServ
            .createProduct(product, this.file)
            .subscribe(({ ok, msg, product }) =>
              this.fc.submitSuccess(ok, msg, product, this.routeInit)
            );
        } else {
          this.productsServ
            .updateProduct(this.id, product, this.file)
            .subscribe(({ ok, msg, product }) =>
              this.fc.submitSuccess(ok, msg, product, this.routeInit)
            );
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Falta imagen',
          text: 'Es necesario colocar una imagen de portada al producto',
        });
      }
    }
  }

  onFileChange(event: any) {
    let reader = new FileReader();
    const imgC = new ImgConditions();
    if (imgC.existImg(event)) {
      let file = <File>event.target.files[0];
      if (imgC.typesImg(file, this.imgTypes) && imgC.sizeImg(file, 4000000)) {
        reader.onload = (e) => (this.imgSelect = reader.result);
        reader.readAsDataURL(file);
        this.file = file;
        this.labelCoverProduct.nativeElement.innerText = file.name;
      } else {
        this.resetImg();
      }
    }
  }

  resetImg() {
    this.labelCoverProduct.nativeElement.innerText = '';
    this.imgSelect = 'assets/img/01.jpg';
  }
}
