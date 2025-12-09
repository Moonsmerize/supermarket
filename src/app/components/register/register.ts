import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: [] // Si quieres estilos, crea el archivo .css vacío por ahora
})
export class RegisterComponent {
  // Datos que enviaremos al backend
  usuario = {
    nombre: '', // Asegúrate que tu backend espere "nombre" o "nombre_completo"
    email: '',
    password: ''
  };

  errorMessage: string = '';
  
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.registro(this.usuario).subscribe({
      next: (response) => {
        alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Error al registrarse. Intenta con otro correo.';
        console.error(error);
      }
    });
  }
}