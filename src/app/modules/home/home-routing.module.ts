import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/root/home.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeBenefitComponent } from './components/home-benefit/home-benefit.component';
import { HomeProviderComponent } from './components/home-provider/home-provider.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'main/first-access',
        component: RegisterSuccessComponent,
      },
      {
        path: 'profile',
        children: [
          {
            path: 'edit',
            component: EditComponent,
          },
          {
            path: '',
            component: ProfileComponent,
          },
        ],
      },
      {
        path: 'main/benefit',
        component: HomeBenefitComponent,
      },
      {
        path: 'main/provider',
        component: HomeProviderComponent,
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('../tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../schedule/schedule.module').then((m) => m.ScheduleModule),
      },
      {
        path: '',
        redirectTo: 'main/first-access',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'main/first-access',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/main/first-access',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
