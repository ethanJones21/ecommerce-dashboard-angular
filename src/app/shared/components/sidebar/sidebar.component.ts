import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'Sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sidebar$!: Observable<any[]>;
  constructor(private sidebarServ: SidebarService) {}

  ngOnInit(): void {
    this.sidebar$ = this.sidebarServ.getSidebar();
  }
}
