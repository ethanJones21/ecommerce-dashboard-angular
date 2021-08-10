import { Injectable, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  setNewProduct(form: FormGroup, product: any, el: ElementRef) {
    const {
      name,
      // slug,
      // galery,
      cover,
      price,
      description,
      content,
      stock,
      category,
    } = product;
    el.nativeElement.innerText = cover;
    form.setValue({
      nameProduct: name,
      // slugProduct: slug,
      // galeryProduct: galery,
      // coverProduct: cover,
      priceProduct: price,
      descriptionProduct: description,
      contentProduct: content,
      stockProduct: stock,
      categoryProduct: category,
    });
  }

  reset(form: FormGroup) {
    form.reset({
      nameProduct: '',
      slugProduct: '',
      // galeryProduct: '',
      // coverProduct: '',
      priceProduct: 0,
      descriptionProduct: '',
      contentProduct: '',
      stockProduct: 0,
      categoryProduct: '',
    });
  }
}
