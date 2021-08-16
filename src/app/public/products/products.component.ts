import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductsService } from './products.service';
import { ProductItf } from './models/product.interface';
import { InventoryService } from './inventory/inventory.service';
@Component({
  selector: 'Products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  products$!: Observable<ProductItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(
    private inventoryServ: InventoryService,
    private productsServ: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search(termino: string): void {
    return this.getProducts(termino, 1);
  }

  getImg(img: string) {
    return this.productsServ.getImg(img);
  }

  getProducts(term: any, page: number) {
    this.term = term;
    this.products$ = this.productsServ.getProducts(term, page, this.limit).pipe(
      //prueba de que carge skeleton-load
      // delay(3000),
      map(({ products, ...data }) => {
        this.pagination = { ...data, limit: this.limit };
        return products;
      })
    );
    this.subs.add(this.products$.subscribe());
  }

  goToInventary(product: ProductItf) {
    const { id, name } = product;
    this.inventoryServ.saveProductName(name);
    this.router.navigate(['/panel/inventory/', id]);
  }

  deactivateProduct(id: string) {
    Swal.fire({
      title: '¿Esta seguro de desactivar este producto?',
      text: 'Si continua este producto solo tendra una opcion de habilitarlo',
      icon: 'question',
      confirmButtonText: 'Desactivar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsServ.deactivateProduct(id).subscribe(({ ok, msg }) => {
          Swal.fire({
            icon: 'success',
            title: `ok: ${ok}`,
            text: msg,
          });
          this.getProducts('', 1);
        });
      }
    });
  }
}
