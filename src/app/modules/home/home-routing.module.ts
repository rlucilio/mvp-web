import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/root/home.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'first-access',
        component: RegisterSuccessComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        redirectTo: 'first-access',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'first-access',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/first-access',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
