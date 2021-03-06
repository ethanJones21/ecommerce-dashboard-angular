import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductsService } from './products.service';
import { ProductItf } from './models/product.interface';
import { InventoryService } from './inventory/inventory.service';
import { VarietiesService } from './varieties/varieties.service';
import { GaleryService } from './galery/galery.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'Products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  excelProducts: any[] = [];
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
    private galeryServ: GaleryService,
    private varietiesServ: VarietiesService,
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

  exportToExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');
    worksheet.addRow(undefined);
    for (let x1 of this.excelProducts) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    let fname = 'REP01 ';
    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 20 },
      { header: 'Categoria', key: 'col4', width: 30 },
      { header: 'N?? Ventas', key: 'col5', width: 20 },
    ];

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
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
    this.subs.add(
      this.products$.subscribe((products) =>
        products.forEach(({ name, stock, price, category, nsales }) =>
          this.excelProducts.push({ name, stock, price, category, nsales })
        )
      )
    );
  }

  goToInventary(product: ProductItf) {
    const { id, name } = product;
    this.inventoryServ.saveProductName(name);
    this.router.navigate(['/panel/products/inventory/', id]);
  }

  goToVarieties(product: ProductItf) {
    const { id, name } = product;
    this.varietiesServ.saveProductName(name);
    this.router.navigate(['/panel/products/varieties/', id]);
  }

  goToGalery(product: ProductItf) {
    const { id, name } = product;
    this.galeryServ.saveProductName(name);
    this.router.navigate(['/panel/products/galery/', id]);
  }

  deactivateProduct(id: string) {
    Swal.fire({
      title: '??Esta seguro de desactivar este producto?',
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
