import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompanySectionComponent } from './components/company-section/company-section.component';
import { CompanyPopupAddComponent } from './components/company-section/company-popup-add/company-popup-add.component';
import { CompanyPopupViewComponent } from './components/company-section/company-popup-view/company-popup-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CompanySectionComponent,
    CompanyPopupAddComponent,
    CompanyPopupViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
