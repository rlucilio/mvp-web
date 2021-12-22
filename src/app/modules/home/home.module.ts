import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/root/home.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { LayoutModule } from '../layout/layout.module';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { BenefitModule } from 'src/app/core/benefit/benefit.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProviderModule } from 'src/app/core/provider/provider.module';
import { EditComponent } from './components/edit/edit.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from '../schedule/services/schedule.service';
import { HomeBenefitComponent } from './components/home-benefit/home-benefit.component';
import { HomeProviderComponent } from './components/home-provider/home-provider.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterSuccessComponent,
    ProfileComponent,
    EditComponent,
    HomeBenefitComponent,
    HomeProviderComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    SharedComponentsModule,
    BenefitModule,
    ProviderModule,
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers: [ScheduleService],
})
export class HomeModule {}
