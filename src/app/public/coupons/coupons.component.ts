import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CouponsService } from './coupons.service';
import { CouponItf } from './models/coupon.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'Coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss'],
})
export class CouponsComponent implements OnInit {
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  coupons$!: Observable<CouponItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(private couponsServ: CouponsService, private router: Router) {}

  ngOnInit(): void {
    this.getCoupons('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search(termino: string): void {
    return this.getCoupons(termino, 1);
  }

  getCoupons(term: any, page: number) {
    this.term = term;
    this.coupons$ = this.couponsServ.getCoupons(term, page, this.limit).pipe(
      //prueba de que carge skeleton-load
      // delay(3000),
      map(({ coupons, ...data }) => {
        this.pagination = { ...data, limit: this.limit };
        return coupons;
      })
    );
    this.subs.add(this.coupons$.subscribe());
  }

  deleteCoupon(id: string) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este cupon?',
      text: 'Si continua este cupon se eliminara',
      icon: 'question',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponsServ.deleteCoupon(id).subscribe(({ ok, msg }) => {
          Swal.fire({
            icon: 'success',
            title: 'Cupon eliminado',
            text: msg,
          });
          this.getCoupons('', 1);
        });
      }
    });
  }
}
