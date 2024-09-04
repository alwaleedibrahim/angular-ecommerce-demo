import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  url: string = `${environment.baseURL}/products`;
  cart: IProduct[] = [];
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(this.url);
  }

  getProductsByCatID(catID: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${this.url}?categoryID=${catID}`);
  }

  getProductByID(productID: number | string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${this.url}/${productID}`);
  }

  filter(
    categoryFilter: string = 'all',
    maxPriceFilter: number = 99999999,
    minPriceFilter: number = 0
  ) {
    let filtered!: IProduct[];
    this.getAll().subscribe((data) => (filtered = data));
    if (categoryFilter == 'all') {
      this.getAll().subscribe(data=> {
        filtered = data
      })
    } else {
      this.getProductsByCatID(categoryFilter).subscribe({
        next: (data) => {
          filtered = data;
        },
        error: (err) => {
          filtered = [];
        },
      });
    }
    filtered = filtered.filter((p) => p.price >= minPriceFilter);
    filtered = filtered.filter((p) => p.price <= maxPriceFilter);
    return filtered;
  }
}
