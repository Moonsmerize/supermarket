import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { UsuariosService } from '../../services/usuarios';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  private prodService = inject(ProductosService);
  private userService = inject(UsuariosService);

  pestanaActual: 'productos' | 'usuarios' = 'productos';

  listaProductos: any[] = [];
  listaUsuarios: any[] = [];

  productoForm: any = { idProductos: 0, nombre: '', precio: 0, stock: 0, descripcion: '', imagenUrl: '' };
  usuarioForm: any = { idUsuarios: 0, nombre: '', email: '', password: '', idRoles: 1 };

  mostrarModalProducto = false;
  esEdicionProducto = false;

  mostrarModalUsuario = false;
  esEdicionUsuario = false;

  ngOnInit() {
    this.cargarProductos();
    this.cargarUsuarios();
  }

  cargarProductos() {
    this.prodService.getProductos().subscribe(data => this.listaProductos = data);
  }
  cargarUsuarios() {
    this.userService.getUsuarios().subscribe(data => this.listaUsuarios = data);
  }

  abrirFormProducto(producto?: any) {
    this.mostrarModalProducto = true;
    if (producto) {
      this.esEdicionProducto = true;
      this.productoForm = { ...producto };
    } else {
      this.esEdicionProducto = false;
      this.productoForm = { idProductos: 0, nombre: '', precio: null, stock: null, descripcion: '', imagenUrl: '', idCategorias: 1 };
    }
  }

  guardarProducto(form: NgForm) {
    if (form.invalid) return;

    if (this.esEdicionProducto) {
      this.prodService.editarProducto(this.productoForm.idProductos, this.productoForm).subscribe({
        next: () => {
          alert('Producto actualizado con éxito');
          this.cerrarModalProducto();
          this.cargarProductos();
        },
        error: (e) => alert('Error al actualizar: ' + e.message)
      });
    } else {
      this.prodService.crearProducto(this.productoForm).subscribe({
        next: () => {
          alert('Producto creado con éxito');
          this.cerrarModalProducto();
          this.cargarProductos();
        },
        error: (e) => alert('Error al crear: ' + e.message)
      });
    }
  }

  cerrarModalProducto() {
    this.mostrarModalProducto = false;
  }

  eliminarProducto(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.prodService.eliminarProducto(id).subscribe(() => this.cargarProductos());
    }
  }

  abrirFormUsuario(usuario?: any) {
    this.mostrarModalUsuario = true;
    if (usuario) {
      this.esEdicionUsuario = true;
      this.usuarioForm = { ...usuario, password: '' };
    } else {
      this.esEdicionUsuario = false;
      this.usuarioForm = { nombre: '', email: '', password: '', idRoles: 1 };
    }
  }

  guardarUsuario(form: NgForm) {
    if (form.invalid) return;

    if (this.esEdicionUsuario) {
      if (!this.usuarioForm.password) {
        delete this.usuarioForm.password;
      }

      this.userService.editarUsuario(this.usuarioForm.idUsuarios, this.usuarioForm).subscribe({
        next: () => {
          alert('Usuario actualizado');
          this.cerrarModalUsuario();
          this.cargarUsuarios();
        },
        error: (e) => alert('Error: ' + e.message)
      });
    } else {
      this.userService.crearUsuario(this.usuarioForm).subscribe({
        next: () => {
          alert('Usuario creado');
          this.cerrarModalUsuario();
          this.cargarUsuarios();
        },
        error: (e) => {
          console.error(e);

          alert('Error: ' + (e.error || e.message));
        }
      });
    }
  }

  cerrarModalUsuario() {
    this.mostrarModalUsuario = false;
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Eliminar usuario permanentemente?')) {
      this.userService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }
}