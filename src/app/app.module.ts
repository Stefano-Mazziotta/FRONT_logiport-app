import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderMobileComponent } from './components/app-mobile/header-mobile/header-mobile.component';

import { CompanySectionComponent } from './components/company-section/company-section.component';
import { CompanyCreateUpdateModalComponent } from './components/company-section/company-create-update-modal/company-create-update-modal.component';
import { CompanyViewModalComponent } from './components/company-section/company-view-modal/company-view-modal.component';

import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';

import { CompanySelectorComponent } from './components/company-selector/company-selector.component';

import { BoatSectionComponent } from './components/boat-section/boat-section.component';
import { BoatCreateUpdateModalComponent } from './components/boat-section/boat-create-update-modal/boat-create-update-modal.component';
import { BoatPopupViewComponent } from './components/boat-section/boat-popup-view/boat-popup-view.component';

import { MotorAbmComponent } from './components/motor-abm/motor-abm.component';
import { GeneratorAbmComponent } from './components/generator-abm/generator-abm.component';

import { TimestampToDatePipe } from './pipes/timestampToDate.pipe';
import { NavBottomMobileComponent } from './components/app-mobile/nav-bottom-mobile/nav-bottom-mobile.component';
import { HomeComponent } from './components/home/home.component';
import { LoaderDirective } from './directives/loader/loader.directive';
import { NavHeaderDesktopComponent } from './components/app-desktop/nav-header-desktop/nav-header-desktop.component';
import { AppDesktopComponent } from './components/app-desktop/app-desktop.component';
import { AppMobileComponent } from './components/app-mobile/app-mobile.component';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptorInterceptor } from './interceptors/JwtInterceptor/jwt-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMobileComponent,
    CompanySectionComponent,
    CompanyCreateUpdateModalComponent,
    CompanyViewModalComponent,
    ConfirmDeleteModalComponent,
    BoatSectionComponent,
    MotorAbmComponent,
    GeneratorAbmComponent,
    CompanySelectorComponent,
    BoatCreateUpdateModalComponent,
    BoatPopupViewComponent,
    TimestampToDatePipe,
    NavBottomMobileComponent,
    HomeComponent,
    LoaderDirective,
    NavHeaderDesktopComponent,
    AppDesktopComponent,
    AppMobileComponent,
    LoginComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true,
      }
    ),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
