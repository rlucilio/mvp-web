import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { UserAuthModule } from './core/user-auth/user-auth.module';
import { ServerModule } from './core/server/server.module';
import { AccessTokenInterceptor } from './core/user-auth/interceptors/access-token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServicesModule } from './core/shared/services/services.module';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
