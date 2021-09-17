import { Injectable } from '@angular/core';
import {
  getSettingItf,
  createUpdateSettingItf,
} from './models/setting-api.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SettingItf } from './models/setting.interface';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  getSetting(): Observable<SettingItf> {
    return this.http
      .get<getSettingItf>(`${apiUrl}/admins/settings`)
      .pipe(map(({ ok, setting }) => setting));
  }

  updateSetting(data: any, file: File): Observable<createUpdateSettingItf> {
    const fd = new FormData();
    this.destructureData(data, file, fd);
    return this.http.put<createUpdateSettingItf>(
      `${apiUrl}/admins/settings`,
      fd
    );
  }

  getImg(logo: string) {
    return `${apiUrl}/file/logo/${logo}`;
  }

  private destructureData(data: any, file: File, fd: FormData) {
    const { title, categories, serie, correlative } = data;
    if (title) fd.append('title', title);
    for (const c of categories) {
      fd.append('categories', JSON.stringify(c));
    }
    if (serie) fd.append('serie', serie);
    if (correlative) fd.append('correlative', correlative);
    fd.append('logo', file);
  }
}
