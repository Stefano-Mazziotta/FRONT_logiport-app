import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { CompanyPopupAddComponent } from './components/company-section/company-popup-add-edit/company-popup-add-edit.component';
import { CompanyPopupViewComponent } from './components/company-section/company-popup-view/company-popup-view.component';
import { CompanyPopupConfirmDeleteComponent } from './components/company-section/company-popup-confirm-delete/company-popup-confirm-delete.component';
import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { MotorAbmComponent } from './components/motor-abm/motor-abm.component';
import { GeneratorAbmComponent } from './components/generator-abm/generator-abm.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompanySectionComponent,
    CompanyPopupAddComponent,
    CompanyPopupViewComponent,
    CompanyPopupConfirmDeleteComponent,
    BoatSectionComponent,
    MotorAbmComponent,
    GeneratorAbmComponent,
    CompanyLoginComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
