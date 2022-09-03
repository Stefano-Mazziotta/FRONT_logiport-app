import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { CompanySelectorComponent } from './components/company-selector/company-selector.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserGuardGuard } from './guards/userGuard/user-guard.guard';

const routes: Routes = [
  {
    path: 'empresas', 
    component: CompanySectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'seleccionar-empresa', 
    component: CompanySelectorComponent,
    canActivate: [UserGuardGuard],
    
  },
  {
    path: ':companyName/lanchas', 
    component: BoatSectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'inicio', 
    component: HomeComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '',   
    redirectTo: '/login', 
    pathMatch: 'full',
  },
  {
    path: '**', 
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
