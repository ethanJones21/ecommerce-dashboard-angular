import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserItf } from './models/user.interface';
import { UsersDataService } from './usersData.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'Users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  term = '';
  pagination = {
    pages: [1],
    longitud: 1,
    previous: 0,
    next: 2,
    limit: 1,
  };

  users$!: Observable<UserItf[]>;
  subs = new Subscription();
  pagesEl: ElementRef[] = [];

  limit = 10;
  notPrevPage = false;
  notNextPage = false;

  constructor(
    private usersDataServ: UsersDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers('', 1);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  search(termino: string): void {
    return this.getUsers(termino, 1);
  }

  getUsers(term: any, page: number) {
    this.term = term;
    this.users$ = this.usersDataServ.getUsers(term, page, this.limit).pipe(
      // delay(3000),
      map(({ users, ...data }) => {
        this.pagination = { ...data, limit: this.limit };
        return users;
      })
    );
    this.subs.add(this.users$.subscribe());
  }

  deactivateUser(id: string) {
    Swal.fire({
      title: '¿Esta seguro de desactivar este usuario?',
      text: 'Si continua este usuario solo tendra una opcion de habilitarlo',
      icon: 'question',
      confirmButtonText: 'Desactivar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersDataServ.deactivateUser(id).subscribe(({ ok, msg }) => {
          Swal.fire({
            icon: 'success',
            title: ok,
            text: msg,
          });
          this.getUsers('', 1);
        });
      }
    });
  }
}
