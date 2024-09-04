import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../models/iuser';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isValidLogin: boolean = false;
  url: string = `${environment.baseURL}/users`;
  constructor(private httpClient: HttpClient, private authService: AuthService, private router : Router) {}

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url, user);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.url);
  }

  checkLogin(email: string, password: string) {
    this.httpClient.get<IUser[]>(this.url).subscribe({
      next: (users) => {
        const user = users.find((u) => u.email == email);
        console.log(user);
        
        if (!user) {
          this.isValidLogin = false;
        } else {
          if (user.password == password) {
            this.isValidLogin = true;
            this.authService.login()
            this.router.navigate(['/home'])
          } else {
            this.isValidLogin = false;
          }
        }
      },
    });
  }
}
