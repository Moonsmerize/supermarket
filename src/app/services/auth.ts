import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5254/api/Auth';

  // Inyección de dependencia moderna (Angular 17+)
  private http = inject(HttpClient);

  constructor() { }

  // para c#
  registro(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, datos);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.guardarToken(response.token);
          
          // Opcional: Guardar datos del usuario para mostrar "Hola Juan"
          if(response.usuario) {
              localStorage.setItem('usuario_nombre', response.usuario);
          }
        }
      })
    );
  }

  private guardarToken(token: string): void {
    localStorage.setItem('token_supermercado', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token_supermercado');
  }

  logout(): void {
    localStorage.removeItem('token_supermercado');
    localStorage.removeItem('usuario_nombre');
    // Aquí podrías redirigir al login
  }

  estaLogueado(): boolean {
    return !!this.getToken();
  }
}