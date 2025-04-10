import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Core/Components/header/header.component';
import { FooterComponent } from './Core/Components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './Core/Components/nav-bar/nav-bar.component';
import { HomeComponent } from './Core/Components/home/home.component';
import { AboutComponent } from './Core/Components/about/about.component';
import { ContactComponent } from './Core/Components/contact/contact.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './Features/user/user.module';
import { BlogModule } from './Features/blog/blog.module';
import { AuthGuard } from './Core/Guards/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessagePort } from 'worker_threads';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { HeroSectionComponent } from './Core/Components/hero-section/hero-section.component';
import { HhtpInterceptorService } from './Core/Interceptors/hhtp-interceptor.service';

import { AdminModule } from './Features/admin/admin.module';

import {CookieService} from "ngx-cookie-service"
import { SharedModule } from "./Shared/shared.module";

import { NotFoundComponent } from './Core/Components/not-found/not-found.component';

import { FormsModule } from '@angular/forms';

import { SearchFilterComponent } from './Core/Components/search-filter/search-filter.component';
import { GlobalErrorHandlerService } from './Core/Services/global-error-handler.service';
import { HttpErrorHandlerService } from './Core/Services/http-error-handler.service';
import { UserRoutingModule } from './Features/user/user-routing.module';
import { AdminRoutingModule } from './Features/admin/admin-routing.module';
import { BlogRoutingModule } from './Features/blog/blog-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeroSectionComponent,
    NotFoundComponent,
    SearchFilterComponent,



    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    // UserModule,
    ToastModule,
    AdminModule,
    SharedModule,
    FormsModule,
    UserRoutingModule,
    AdminRoutingModule,
    BlogRoutingModule,
    UserRoutingModule,
    BlogModule
    
],
  providers: [
    CookieService,
    {provide:ErrorHandler, useClass:GlobalErrorHandlerService},
    // {provide:HTTP_INTERCEPTORS,useClass:HttpErrorHandlerService,multi:true},
    {provide:HTTP_INTERCEPTORS, useClass:HhtpInterceptorService, multi:true},
    // provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura,
            options:{
              darkModeSelector:false|| "none",
            }
        }
    }),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
