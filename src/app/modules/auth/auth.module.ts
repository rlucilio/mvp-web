import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/root/auth.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRegisterPassComponent } from './auth-register-pass/auth-register-pass.component';

@NgModule({
  declarations: [AuthComponent, AuthLoginComponent, AuthRegisterPassComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class AuthModule {}
