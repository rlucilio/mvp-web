import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { REGEX_EMAIL } from 'src/app/core/shared/constants';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';
import { verifyFirstAccessValidator } from '../../validators/verify-first-access.validator';

@Component({
  selector: 'app-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  typePass: 'text' | 'password' = 'password';
  formLogin?: FormGroup;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userAuthService: UserAuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(REGEX_EMAIL)],
        asyncValidators: [verifyFirstAccessValidator(this.userAuthService)],
      }),
      pass: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
    });
  }

  togglePass() {
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
  }

  login() {
    const email = this.formLogin?.get('email')?.value;
    const pass = this.formLogin?.get('pass')?.value;
    if (email && pass) {
      this.userAuthService
        .login(email, pass)
        .subscribe(() => console.log('Logado'));
    }
  }

  registerPass() {
    const email = this.formLogin?.get('email')?.value;
    if (email) {
      this.router.navigate(['/auth/register-pass', email]);
    }
  }

  requestChangePass() {
    const email = this.formLogin?.get('email');
    if (email && email.value && email?.valid) {
      this.userAuthService
        .requestChangePass(email.value)
        .subscribe(() => console.log('solicitado para trocar a senha'));
    }
  }
}
