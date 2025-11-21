import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  
  listaProductos: any[] = [];
  private productosService = inject(ProductosService);

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (datos) => {
        console.log('Productos cargados:', datos);
        this.listaProductos = datos;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  agregarAlCarrito(producto: any) {
    console.log('Agregando al carrito:', producto.nombre);
    alert(`Agregaste ${producto.nombre} al carrito`);
  }
}