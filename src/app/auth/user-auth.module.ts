import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './services/user-auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [UserAuthService]
})
export class UserAuthModule { }
