import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  
  credenciales = {
    email: '', 
    password: ''
  };

  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.errorMessage = '';

    this.authService.login(this.credenciales).subscribe({
      next: (res) => {
        if (this.authService.esAdmin()) {
           this.router.navigate(['/admin']); 
        } else {
           this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}