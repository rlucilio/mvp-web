import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './components/root/tasks.component';
import { TaskHomeBenefitComponent } from './components/task-home-benefit/task-home-benefit.component';
import { TaskHomeProviderComponent } from './components/task-home-provider/task-home-provider.component';
import { TasksBenefitComponent } from './components/tasks-benefit/tasks-benefit.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: 'benefit',
        component: TaskHomeBenefitComponent,
      },
      {
        path: 'provider',
        component: TaskHomeProviderComponent,
      },
      {
        path: 'provider/benefit',
        component: TasksBenefitComponent,
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
