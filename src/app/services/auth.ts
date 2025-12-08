import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private apiUrl = 'https://supermarket-bd1f.onrender.com/api/Auth';
  private http = inject(HttpClient);

  constructor() { }

  // LOGIN
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token_supermercado', response.token);
          
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
    const token = this.getToken();
    return !!token && !this.tokenExpirado();
  }

  getNombreUsuario(): string {
    return localStorage.getItem('usuario_nombre') || '';
  }

  
  recuperarSesion(): void {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodificarToken(token);
      if (decoded) {        
        const nombre = decoded.unique_name || decoded.name || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        const rol = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        if (nombre) localStorage.setItem('usuario_nombre', nombre);
        if (rol) localStorage.setItem('usuario_rol', rol);
      }
    }
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

  tokenExpirado(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodificarToken(token);
    if (!decoded || !decoded.exp) return true;

    const fechaExpiracion = decoded.exp * 1000;
    const ahora = new Date().getTime();

    return fechaExpiracion < ahora;
  }

  private decodificarToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
}