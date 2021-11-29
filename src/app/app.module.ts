import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthModule } from './auth/user-auth.module';
import { StorageModule } from './storage/storage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserAuthModule,
    StorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
