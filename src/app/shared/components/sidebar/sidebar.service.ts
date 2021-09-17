import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
const apiURL = environment.apiUrl;
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private http: HttpClient) {}
  getSidebar() {
    return this.http
      .get<{ ok: boolean; sidebar: any[] }>(`${apiURL}/sidebar`)
      .pipe(map(({ ok, sidebar }) => sidebar));
  }
}
