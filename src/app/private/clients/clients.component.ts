import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClientsService } from './clients.service';
import { ClientItf } from './models/client.interface';

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

  clients$!: Observable<ClientItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(private clientsServ: ClientsService, private router: Router) {}

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
        this.pagination = { ...data, limit: this.limit };
        return clients;
      })
    );
    this.subs.add(this.clients$.subscribe());
  }

  deactivateClient(id: string) {
    Swal.fire({
      title: '¿Esta seguro de desactivar este cliente?',
      text: 'Si continua este cliente solo tendra una opcion de habilitarlo',
      icon: 'question',
      confirmButtonText: 'Desactivar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientsServ.deactivateClient(id).subscribe(({ ok, msg }) => {
          Swal.fire({
            icon: 'success',
            title: ok,
            text: msg,
          });
          this.getClients('', 1);
        });
      }
    });
  }
}
