import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ClientsService } from './services/clients.service';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'Clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy, AfterViewInit {
  clients$!: Observable<any[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];
  pages: number[] = []; //longitud
  limit = 1;
  previous = 1;
  next = 1;
  isLoading = true;
  notPrevPage = false;
  notNextPage = false;

  @ViewChildren('paginaCliente', { read: ElementRef })
  paginaCliente!: QueryList<ElementRef>;

  constructor(
    private clientsServ: ClientsService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.fillPagesArr();
    this.getClients(1);
  }

  ngAfterViewInit(): void {
    this.getPagesEl();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private selectedPage(page: number) {
    //empieza desde cero [0]
    if (this.pagesEl.length > 0) {
      this.renderer.addClass(this.pagesEl[page - 1].nativeElement, 'selected');
    }
  }

  private removeAllSelectedPages() {
    if (this.pagesEl.length > 0) {
      this.pagesEl.forEach((val, i) => {
        this.renderer.removeClass(this.pagesEl[i].nativeElement, 'selected');
      });
    }
  }

  private getPagesEl() {
    //una sola vez
    this.subs.add(
      this.paginaCliente.changes.subscribe((paginas) => {
        paginas.forEach(
          (pagina: ElementRef, i: number) => (this.pagesEl[i] = pagina)
        );
        this.selectedPage(1);
      })
    );
  }

  private fillPagesArr() {
    //una sola vez
    this.subs.add(
      this.clientsServ.getPagesClients().subscribe((longitud: number) => {
        for (let i = 0; i < longitud; i++) {
          this.pages[i] = i + 1; //comienza en 1
        }
      })
    );
  }

  private conditionalsControls(previous: any, next: any, longitud: number) {
    if (typeof previous === 'number') {
      this.previous = previous;
      if (previous == 0) this.notPrevPage = true;
    } else {
      this.previous = previous.page;
      this.notPrevPage = false;
    }

    if (typeof next === 'number') {
      this.next = next;
      if (this.next == longitud) this.notNextPage = true;
    } else {
      this.next = next.page;
      this.notNextPage = false;
    }
  }

  getClients(page: number) {
    this.clients$ = this.clientsServ.getClients(page, this.limit).pipe(
      // delay(3000),
      map(({ clients, longitud, previous, next }) => {
        this.conditionalsControls(previous, next, longitud);

        this.removeAllSelectedPages();
        this.selectedPage(page);
        this.isLoading = false;
        return clients;
      })
    );
    this.subs.add(this.clients$.subscribe());
  }
}
