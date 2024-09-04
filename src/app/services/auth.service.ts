import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedSubject: BehaviorSubject<boolean>
  constructor() {
    this.isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged)
  }

  get isLogged(): boolean {
    return !!localStorage.getItem("token")
  }
  login() {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
    this.isLoggedSubject.next(true)
  }
  logout() {
    localStorage.removeItem("token")
    this.isLoggedSubject.next(false)
  }

  getUserLogStatus() {
    return this.isLoggedSubject.asObservable()
  }
}
