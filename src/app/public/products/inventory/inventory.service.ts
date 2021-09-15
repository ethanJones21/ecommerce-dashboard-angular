import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  createUpdateInventoryItf,
  deleteInventoryItf,
  getInventoriesItf,
  onlyInventoriesInfoItf,
} from '../models/inventory-api.interface';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private NAMEPRODUCT = '';
  constructor(private http: HttpClient) {}

  reset(form: FormGroup) {
    form.reset({
      proveedor: '',
      total: 0,
    });
  }

  saveProductName(name: string) {
    this.NAMEPRODUCT = name;
    localStorage.setItem('nameProduct', name);
  }

  get nameProduct(): string | null {
    return this.NAMEPRODUCT || localStorage.getItem('nameProduct');
  }

  getInventories(
    productID: string,
    term: any,
    page: number,
    limit: number
  ): Observable<onlyInventoriesInfoItf> {
    return this.http
      .get<getInventoriesItf>(
        `${apiUrl}/users/inventories/${productID}/paginado?term=${term}&page=${page}&limit=${limit}`
      )
      .pipe(map(({ ok, inventories }) => inventories));
  }

  createInventory(
    productID: string,
    data: any
  ): Observable<createUpdateInventoryItf> {
    console.log(productID);
    return this.http.post<createUpdateInventoryItf>(
      `${apiUrl}/users/inventories/${productID}`,
      data
    );
  }

  updateInventory(id: string, data: any): Observable<createUpdateInventoryItf> {
    return this.http.put<createUpdateInventoryItf>(
      `${apiUrl}/users/inventories/${id}`,
      data
    );
  }

  deleteInventory(id: string): Observable<deleteInventoryItf> {
    return this.http.delete<deleteInventoryItf>(
      `${apiUrl}/users/inventories/${id}`
    );
  }
}
