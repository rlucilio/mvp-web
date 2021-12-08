import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleComponent } from './components/root/schedule.component';

@NgModule({
  declarations: [ScheduleComponent, ScheduleListComponent],
  imports: [CommonModule, ScheduleRoutingModule],
})
export class ScheduleModule {}
