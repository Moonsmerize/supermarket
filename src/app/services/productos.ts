import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:5254/api/Productos';
  private http = inject(HttpClient);
  private auth = inject(AuthService); 

  constructor() { }

  // --- PÚBLICO ---
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  private getHeaders() {
    return {
      headers: { 'Authorization': `Bearer ${this.auth.getToken()}` }
    };
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto, this.getHeaders());
  }

  editarProducto(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto, this.getHeaders());
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}