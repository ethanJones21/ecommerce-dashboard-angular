import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IMGTYPES } from '../../../core/models/img-types.model';
import { ImgConditions } from '../../../core/helpers/img-conditions.class';

@Component({
  selector: 'Product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  imgTypes = IMGTYPES;
  productForm!: FormGroup;
  file!: File;
  imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';

  @ViewChild('labelCoverProduct') labelCoverProduct!: ElementRef;

  config = {
    height: 500,
  };

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    this.productForm = this.fb.group({
      titleProduct: ['', Validators.required],
      slugProduct: ['', Validators.required],
      galeryProduct: ['', Validators.required],
      coverProduct: ['', Validators.required],
      priceProduct: [0, Validators.required],
      descriptionProduct: ['', Validators.required],
      contentProduct: ['', Validators.required],
      stockProduct: [0, Validators.required],
      nsalesProduct: [0, Validators.required],
      starsProduct: [0, Validators.required],
      categoryProduct: ['', Validators.required],
    });
  }

  reset() {
    this.productForm.reset({
      titleProduct: '',
      slugProduct: '',
      galeryProduct: '',
      coverProduct: '',
      priceProduct: 0,
      descriptionProduct: '',
      contentProduct: '',
      stockProduct: 0,
      nsalesProduct: 0,
      starsProduct: 0,
      categoryProduct: '',
    });
  }

  submitForm(form: FormGroup) {
    if (form.invalid) {
      return Object.values(form.controls).forEach((control) => {
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

  onFileChange(event: any) {
    let reader = new FileReader();
    const imgC = new ImgConditions();
    if (imgC.existImg(event)) {
      let file = <File>event.target.files[0];
      if (imgC.typesImg(file, this.imgTypes) || imgC.sizeImg(file, 4000000)) {
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
