import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
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
        console.log('Login correcto:', res);
        alert('¡Bienvenido ' + (res.usuario || 'Usuario') + '!');
      },
      error: (err) => {
        console.error('Error de login:', err);
        this.errorMessage = 'Correo o contraseña incorrectos.';
      }
    });
  }
}