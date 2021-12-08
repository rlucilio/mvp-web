import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/root/schedule.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [{ path: 'list', component: ScheduleListComponent }],
  },
  { path: '**', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleRoutingModule {}
