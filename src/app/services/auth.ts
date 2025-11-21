import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5254/api/Auth';
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

  logout(): void {
    localStorage.removeItem('token_supermercado');
    localStorage.removeItem('usuario_nombre');
    localStorage.removeItem('usuario_rol'); 
    window.location.reload(); 
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token_supermercado');
  }

  getNombreUsuario(): string {
    return localStorage.getItem('usuario_nombre') || '';
  }

  getToken(): string | null {
    return localStorage.getItem('token_supermercado');
  }

  getRol(): number {
    const rol = localStorage.getItem('usuario_rol');
    return rol ? parseInt(rol) : 0;
  }

  esAdmin(): boolean {
    return this.getRol() === 2;
  }
}