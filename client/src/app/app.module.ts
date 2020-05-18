import { AppRoutingModule} from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LOCALE_ID} from "@angular/core";

import { AppComponent } from './app.component';
import { ShoppinglistListComponent } from './shoppinglist-list/shoppinglist-list.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import { ShoppingListService } from "./shared/shopping-list.service";
import { HomeComponent } from './home/home.component';

import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import {AuthService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { ShoppinglistUserComponent } from './shoppinglist-user/shoppinglist-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppinglistListComponent,
    ShoppinglistComponent,
    ShoppinglistDetailsComponent,
    ShoppinglistFormComponent,
    HomeComponent,
    LoginComponent,
    ShoppinglistUserComponent,
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [ShoppingListService, AuthService,
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : TokenInterceptorService,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS ,
      useClass : JwtInterceptorService,
      multi : true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
