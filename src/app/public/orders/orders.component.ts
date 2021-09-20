import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from './orders.service';
import { Router } from '@angular/router';
import { Workbook } from 'exceljs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as fs from 'file-saver';
import { OrderItf } from './models/order.interface';

@Component({
  selector: 'Orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  excelOrders: any[] = [];
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  orders$!: Observable<OrderItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(private ordersServ: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  exportToExcel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Reporte de productos');
    worksheet.addRow(undefined);
    for (let x1 of this.excelOrders) {
      let x2 = Object.keys(x1);
      let temp = [];
      for (let y of x2) {
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    let fname = 'REP01 ';
    worksheet.columns = [
      { header: 'Nº Venta', key: 'col1', width: 40 },
      { header: 'Creado en', key: 'col2', width: 20 },
      { header: 'Cliente', key: 'col3', width: 60 },
      { header: 'Total', key: 'col4', width: 40 },
      { header: 'Delivery', key: 'col5', width: 20 },
      { header: 'Estado', key: 'col6', width: 20 },
    ];

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }

  search(termino: string): void {
    return this.getOrders(termino, 1);
  }

  getOrders(term: any, page: number) {
    this.term = term;
    this.orders$ = this.ordersServ.getOrders(term, page, this.limit).pipe(
      //prueba de que carge skeleton-load
      // delay(3000),
      map(({ orders, ...data }) => {
        this.pagination = { ...data, limit: this.limit };
        return orders;
      })
    );
    this.subs.add(
      this.orders$.subscribe((orders) =>
        orders.forEach(
          ({ nsale, createdAt, client, total, delivery, state }) =>
            this.excelOrders.push({
              nsale,
              createdAt,
              client,
              total,
              delivery,
              state,
            })
          // this.excelOrders.push({ nsale, createdAt, client.name, total, delivery, state })
        )
      )
    );
  }
}
