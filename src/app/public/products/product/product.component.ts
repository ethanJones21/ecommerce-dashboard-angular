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

  constructor(private fb: FormBuilder, private render: Renderer2) {
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
          this.reset;
        }
      });
    } else {
      console.log(form);
    }
  }

  onFileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = <File>event.target.files[0];
      if (file.size <= 4000000) {
        if (this.imgTypes.includes(file.type)) {
          reader.onload = (e) => (this.imgSelect = reader.result);
          reader.readAsDataURL(file);
          this.file = file;
          this.labelCoverProduct.nativeElement.innerText = file.name;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No es una imagen',
          });
          this.resetImage();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'La imagen no puede superar los 4mb',
        });
        this.resetImage();
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No hay imagen',
      });
      this.resetImage();
    }
  }

  resetImage() {
    this.labelCoverProduct.nativeElement.innerText = '';
    this.imgSelect = 'assets/img/01.jpg';
  }
}
