import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [RouterModule]
})
export class HeaderComponent {
isLoggedIn: boolean = false
constructor(private authService: AuthService) {
  authService.getUserLogStatus().subscribe({
    next: (value)=> this.isLoggedIn = value
  })
}
logout() {
  this.authService.logout()
}
}
