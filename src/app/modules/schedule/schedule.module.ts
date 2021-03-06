import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleComponent } from './components/root/schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { MarkedScheduleComponent } from './components/marked-schedule/marked-schedule.component';
import { ScheduleService } from './services/schedule.service';

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleListComponent,
    DialogComponent,
    MarkedScheduleComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatDialogModule,
    SharedComponentsModule,
  ],
  providers: [ScheduleService],
})
export class ScheduleModule {}
