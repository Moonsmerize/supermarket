import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { AdminComponent } from './components/admin/admin';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  // RUTA DE ADMINISTRACIÓN REAL
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [authGuard],
    data: { role: 2 } // Solo Rol 2 (Admin) entra aquí
  },
  
  { path: '**', redirectTo: 'home' }
];