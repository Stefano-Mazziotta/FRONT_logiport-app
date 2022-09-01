import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { CompanySelectorComponent } from './components/company-selector/company-selector.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'empresas', component: CompanySectionComponent},
  {path: 'seleccionar-empresa', component: CompanySelectorComponent},
  {path: ':companyName/lanchas', component: BoatSectionComponent},
  {path: 'inicio', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '',   redirectTo: '/inicio', pathMatch: 'full'},
  // {path: '**', component: BoatSectionComponent} // 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
