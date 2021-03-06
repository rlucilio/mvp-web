import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/root/auth.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
import { AuthRegisterPassComponent } from './components/auth-register-pass/auth-register-pass.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { RegisterBenefitComponent } from './components/register-benefit/register-benefit.component';
import { RegisterProviderComponent } from './components/register-provider/register-provider.component';
import { BenefitModule } from 'src/app/core/benefit/benefit.module';
import { ProviderModule } from 'src/app/core/provider/provider.module';
import { ServicesModule } from 'src/app/core/shared/services/services.module';
import { LayoutModule } from '../layout/layout.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AuthComponent,
    AuthLoginComponent,
    AuthRegisterPassComponent,
    ChangePassComponent,
    RegisterBenefitComponent,
    RegisterProviderComponent,
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
    BenefitModule,
    ProviderModule,
    ServicesModule,
    LayoutModule,
    NgxMaskModule.forChild(),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class AuthModule {}
