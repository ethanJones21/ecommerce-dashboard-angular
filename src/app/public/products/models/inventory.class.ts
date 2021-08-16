import { FormGroup } from '@angular/forms';
export class InventoryClass {
  total: number;
  supplier: string;
  user: any;
  product: any;
  createdAt?: any;

  constructor(form: FormGroup) {
    const {
      totalInventory: total,
      supplierInventory: supplier,
      userInventory: user,
      productInventory: product,
    } = form.value;
    this.total = total;
    this.supplier = supplier;
    this.user = user;
    this.product = product;
  }
}
