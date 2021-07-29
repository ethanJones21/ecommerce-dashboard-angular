import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClientsService } from './services/clients.service';

@Component({
  selector: 'Clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  clients$!: Observable<any[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  @ViewChildren('paginaCliente', { read: ElementRef })
  paginaCliente!: QueryList<ElementRef>;

  constructor(private clientsServ: ClientsService) {}

  ngOnInit(): void {
    this.getClients('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search(termino: string): void {
    return this.getClients(termino, 1);
  }

  getClients(term: any, page: number) {
    this.term = term;
    this.clients$ = this.clientsServ.getClients(term, page, this.limit).pipe(
      // delay(3000),
      map(({ clients, ...data }) => {
        this.pagination = { ...data };
        this.pagination.limit = this.limit;
        return clients;
      })
    );
    this.subs.add(this.clients$.subscribe());
  }
}
