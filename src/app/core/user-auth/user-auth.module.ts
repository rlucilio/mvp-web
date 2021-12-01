import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth.service';
import { StorageModule } from '../storage/storage.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessTokenInterceptor } from './interceptors/access-token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, StorageModule],
  providers: [
    UserAuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessTokenInterceptor,
      multi: true,
    },
  ],
})
export class UserAuthModule {}
