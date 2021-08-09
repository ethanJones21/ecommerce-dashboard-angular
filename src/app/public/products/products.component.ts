import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductsService } from './products.service';
import { ProductItf } from './models/product.interface';
@Component({
  selector: 'Products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  term = '';
  pagination: any = {
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

  constructor(private productsServ: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search(termino: string): void {
    return this.getProducts(termino, 1);
  }

  getProducts(term: any, page: number) {
    this.term = term;
    this.products$ = this.productsServ.getProducts(term, page, this.limit).pipe(
      // delay(3000), //prueba de que carge skeleton-load
      map(({ products, ...data }) => {
        this.pagination = { ...data };
        this.pagination.limit = this.limit;
        return products;
      })
    );
    this.subs.add(this.products$.subscribe());
  }

  goProductPage(id: string) {
    this.router.navigate(['/panel/products/', id]);
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
