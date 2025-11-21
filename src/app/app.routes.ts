import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },

  { path: 'login', component: LoginComponent },

  { 
    path: 'admin-test', 
    component: Home,
    canActivate: [authGuard],
    data: { role: 2 }        
  },
  
  { path: '**', redirectTo: 'home' }
];