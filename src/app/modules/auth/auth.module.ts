import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/root/auth.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
import { AuthRegisterPassComponent } from './components/auth-register-pass/auth-register-pass.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { RegisterBenefitComponent } from './components/register-benefit/register-benefit.component';

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthRegisterPassComponent,
    ChangePassComponent,
    RegisterBenefitComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AuthModule {}
