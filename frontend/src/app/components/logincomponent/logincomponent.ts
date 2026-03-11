import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './logincomponent.html',
  styleUrls: ['./logincomponent.css'],
  imports: [CommonModule, FormsModule], // <-- IMPORTS ESSENTIELS
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        alert('Connecté avec succès !');
        this.router.navigate(['/tasks']); // redirige vers la page des tâches
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Erreur de connexion';
      }
    });
  }
}
