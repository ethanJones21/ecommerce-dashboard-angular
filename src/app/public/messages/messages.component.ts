import { Component, OnInit, ElementRef } from '@angular/core';
import { MessagesService } from './messages.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'Messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  messages$!: Observable<any[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;
  constructor(private messagesServ: MessagesService) {}

  ngOnInit(): void {
    this.getMessages('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  search(termino: string): void {
    return this.getMessages(termino, 1);
  }

  getMessages(term: any, page: number) {
    this.term = term;
    this.messages$ = this.messagesServ.getMessages(term, page, this.limit).pipe(
      //prueba de que carge skeleton-load
      // delay(3000),
      map(({ messages, ...data }) => {
        this.pagination = { ...data, limit: this.limit };
        return messages;
      })
    );
  }
}
