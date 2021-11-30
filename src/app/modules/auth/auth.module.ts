import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/root/auth.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRegisterPassComponent } from './components/auth-register-pass/auth-register-pass.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthRegisterPassComponent,
    ChangePassComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
})
export class AuthModule {}
