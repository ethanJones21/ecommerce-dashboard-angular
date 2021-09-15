import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class GaleryService {
  private NAMEPRODUCT = '';
  constructor(private http: HttpClient) {}

  saveProductName(name: string) {
    this.NAMEPRODUCT = name;
    localStorage.setItem('nameProduct', name);
  }

  get nameProduct(): string | null {
    return this.NAMEPRODUCT || localStorage.getItem('nameProduct');
  }

  getGalery(productID: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}/users/galery/${productID}`)
      .pipe(map(({ ok, galery }) => galery));
  }
  // : Observable<any>
  createGalery(productID: string, files: File[]) {
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append('galery', files[i]);
    }
    return this.http.put<any>(`${apiUrl}/users/galery/${productID}`, fd);
  }

  deleteImgOfGalery(productID: string, galeryID: string) {
    return this.http.delete<any>(
      `${apiUrl}/users/galery/${productID}/${galeryID}`
    );
  }

  getImg(img: string) {
    return `${apiUrl}/file/products/${img}`;
  }
}
