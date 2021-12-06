import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/root/home.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { BenefitModule } from 'src/app/core/benefit/benefit.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [HomeComponent, RegisterSuccessComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    SharedComponentsModule,
    BenefitModule,
  ],
})
export class HomeModule {}
