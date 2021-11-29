import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth.service';
import { StorageModule } from '../storage/storage.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorageModule
  ],
  providers: [UserAuthService]
})
export class UserAuthModule { }
