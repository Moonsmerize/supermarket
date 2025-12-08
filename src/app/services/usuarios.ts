import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  
  private apiUrl = 'https://supermarket-bd1f.onrender.com/api/Usuarios'; 
  private apiAuth = 'https://supermarket-bd1f.onrender.com/api/Auth/registro';

  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private getHeaders() {
    return { 
      headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } 
    };
  }

  // --- MÉTODOS ---

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiAuth, usuario); 
  }

  editarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario, this.getHeaders());
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}