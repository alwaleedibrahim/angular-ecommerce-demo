import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IProduct } from '../models/iproduct';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ManageProductService {
  url: string = `${environment.baseURL}/products/`;
  constructor(private httpClient: HttpClient) {}

  addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(this.url, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.put<IProduct>(
      `${this.url}${product.id}`,
      product,
      httpOptions
    );
  }

  deleteProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(`${this.url}${product.id}`);
  }
}
