import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  url : string = `${environment.baseURL}/categories` 
  constructor(private httpClient:HttpClient) { }

  getAll() : Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(this.url)
  }
}
