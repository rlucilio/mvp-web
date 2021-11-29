import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterPassComponent } from './auth-register-pass/auth-register-pass.component';
import { AuthLoginComponent } from './components/login/auth-login.component';
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
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}