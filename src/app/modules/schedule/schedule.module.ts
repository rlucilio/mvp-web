import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleComponent } from './components/root/schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';

@NgModule({
  declarations: [ScheduleComponent, ScheduleListComponent, DialogComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MatDialogModule,
    SharedComponentsModule,
  ],
})
export class ScheduleModule {}
