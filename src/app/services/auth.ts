import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5254/api/Auth'; // Tu Backend
  private http = inject(HttpClient);

  constructor() { }

  // --- LOGIN ---
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // 1. Guardamos Token
          localStorage.setItem('token_supermercado', response.token);
          
          // 2. Guardamos Usuario
          if(response.usuario) {
              localStorage.setItem('usuario_nombre', response.usuario);
          }

          // 3. ¡GUARDAMOS EL ROL! (Crucial para permisos)
          if(response.role) {
              localStorage.setItem('usuario_rol', response.role.toString());
          }
        }
      })
    );
  }

  registro(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  // --- GESTIÓN DE SESIÓN ---

  logout(): void {
    localStorage.removeItem('token_supermercado');
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol'); // Borramos el rol al salir
    window.location.reload(); // Recargamos para limpiar estados
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token_supermercado');
  }

  getNombreUsuario(): string {
    return localStorage.getItem('usuario_nombre') || '';
  }

  // --- PERMISOS ---

  // Obtiene el ID del rol (1: Cliente, 2: Admin, 3: Empleado)
  getRol(): number {
    const rol = localStorage.getItem('usuario_rol');
    return rol ? parseInt(rol) : 0;
  }

  // Helper rápido para saber si es Admin
  esAdmin(): boolean {
    return this.getRol() === 2; // Asumiendo que 2 es el ID de Administrador en tu BD
  }
}