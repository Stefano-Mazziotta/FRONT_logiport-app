import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { MotorSectionComponent } from './components/motor-section/motor-section.component';
import { GeneratorSectionComponent } from './components/generator-section/generator-section.component';
import { ExpirationSectionComponent } from './components/expiration-section/expiration-section.component';

import { UserGuardGuard } from './guards/userGuard/user-guard.guard';
import { AccountSectionComponent } from './components/account-section/account-section.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'inicio', 
    component: HomeComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'cuenta', 
    component: AccountSectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'empresas', 
    component: CompanySectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'lanchas', 
    component: BoatSectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'motores', 
    component: MotorSectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'generadores', 
    component: GeneratorSectionComponent,
    canActivate: [UserGuardGuard],
  },
  {
    path: 'vencimientos', 
    component: ExpirationSectionComponent,
    canActivate: [UserGuardGuard],
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
