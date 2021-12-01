import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterPassComponent } from './components/auth-register-pass/auth-register-pass.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
import { RegisterBenefitFormComponent } from './components/register-benefit-form/register-benefit-form.component';
import { RegisterBenefitComponent } from './components/register-benefit/register-benefit.component';
import { RegisterProviderComponent } from './components/register-provider/register-provider.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { AuthComponent } from './components/root/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginComponent,
      },
      {
        path: 'register-pass/:email',
        component: AuthRegisterPassComponent,
      },
      {
        path: 'change-pass',
        component: ChangePassComponent,
      },
      {
        path: 'register-benefit',
        component: RegisterBenefitComponent,
      },
      {
        path: 'register-provider',
        component: RegisterProviderComponent,
      },
      {
        path: 'register-success',
        component: RegisterSuccessComponent,
      },
      {
        path: 'register-form',
        component: RegisterBenefitFormComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
