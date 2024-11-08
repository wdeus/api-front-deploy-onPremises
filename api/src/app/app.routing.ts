import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',  // Removido a barra inicial
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '', // Para definir uma rota filha
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**', // A rota wildcard deve ser a última
    redirectTo: 'login' // Pode redirecionar para uma página existente
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule], // Certifique-se de exportar o RouterModule
})
export class AppRoutingModule { }
