import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class VarietiesService {
  private NAMEPRODUCT = '';
  constructor(private http: HttpClient) {}

  saveProductName(name: string) {
    this.NAMEPRODUCT = name;
    localStorage.setItem('nameProduct', name);
  }

  get nameProduct(): string | null {
    return this.NAMEPRODUCT || localStorage.getItem('nameProduct');
  }

  addVariety(valueCC: any, unit: string) {
    valueCC.units.push(new FormControl(unit, Validators.required));
  }

  setNewVariety(variety: any, valueCC: any) {
    const { title, units } = variety;
    valueCC.titleVariety = title;
    valueCC.units.clear();
    units.forEach((unit: string) => {
      this.addVariety(valueCC, unit);
    });
  }
  // new FormArray([])
  reset(form: FormGroup) {
    form.reset({
      titleVariety: '',
    });
    const units = form.controls['unitsVariety'] as FormArray;
    units.clear();
  }

  getVarieties(productID: string): Observable<any> {
    return this.http
      .get<any>(`${apiUrl}/varieties/${productID}`)
      .pipe(map(({ ok, varieties }) => varieties));
  }

  createVariety(productID: string, data: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/varieties/${productID}`, data);
  }
  updateVariety(productID: string, data: any): Observable<any> {
    return this.http.put<any>(`${apiUrl}/varieties/${productID}`, data);
  }

  deleteVariety(productID: string, varietyID: string): Observable<any> {
    return this.http.delete<any>(
      `${apiUrl}/varieties/${productID}/${varietyID}`
    );
  }
}
