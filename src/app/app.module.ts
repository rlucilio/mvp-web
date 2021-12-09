import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { UserAuthModule } from './core/user-auth/user-auth.module';
import { ServerModule } from './core/server/server.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './core/shared/services/services.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserAuthModule,
    ServerModule,
    BrowserAnimationsModule,
    ServicesModule,
    NgxSpinnerModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
