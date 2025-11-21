import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:5254/api/Productos'; // Tu Backend
  private http = inject(HttpClient);

  constructor() { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProducto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}