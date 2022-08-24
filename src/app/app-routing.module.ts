import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { CompanySelectorComponent } from './components/company-selector/company-selector.component';

const routes: Routes = [
  {path: 'empresas', component: CompanySectionComponent},
  {path: 'seleccionar-empresa', component: CompanySelectorComponent},
  {path: ':companyName/lanchas', component: BoatSectionComponent}, 
  {path: '',   redirectTo: '/home', pathMatch: 'full'},
  // {path: '**', component: BoatSectionComponent} // 404 not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
