import { Injectable } from '@angular/core';
import {
  getConfigItf,
  createUpdateConfigItf,
} from './models/config-api.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ConfigItf } from './models/config.interface';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ConfigsService {
  constructor(private http: HttpClient) {}

  getConfig(): Observable<ConfigItf> {
    return this.http
      .get<getConfigItf>(`${apiUrl}/admins/configs`)
      .pipe(map(({ ok, config }) => config));
  }

  updateConfig(data: any, file: File): Observable<createUpdateConfigItf> {
    const fd = new FormData();
    this.destructureData(data, file, fd);
    return this.http.put<createUpdateConfigItf>(`${apiUrl}/admins/configs`, fd);
  }

  getImg(logo: string) {
    return `${apiUrl}/file/logo/${logo}`;
  }

  private destructureData(data: any, file: File, fd: FormData) {
    const { title, categories, serie, correlative } = data;
    console.log(categories);
    if (title) fd.append('title', title);
    for (const c of categories) {
      fd.append('categories', JSON.stringify(c));
    }
    if (serie) fd.append('serie', serie);
    if (correlative) fd.append('correlative', correlative);
    fd.append('logo', file);
  }
}
