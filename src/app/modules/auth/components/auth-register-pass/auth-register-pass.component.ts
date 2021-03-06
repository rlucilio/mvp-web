import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { REGEX_CELL, REGEX_EMAIL } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';

import { verifyEmailNotUsedValidator } from '../../validators/verify-email-not-used.validator';

@Component({
  selector: 'app-auth-register-pass',
  templateUrl: './auth-register-pass.component.html',
  styleUrls: ['./auth-register-pass.component.scss'],
})
export class AuthRegisterPassComponent implements OnInit {
  typePass: 'text' | 'password' = 'password';
  private userType?: string | null;
  private email?: string;
  formNewPass?: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserAuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.createForm();

    this.verifyIsFirsAccess();
  }

  registerPass() {
    const newPass = this.formNewPass?.get('newPass')?.value;
    const name = `${this.formNewPass?.get('name')?.value} ${
      this.formNewPass?.get('lastName')?.value
    }`;
    const newEmail = this.formNewPass?.get('email')?.value || this.email;
    const mobilePhone = this.formNewPass?.get('mobilePhone')?.value;
    const acceptTerm = this.formNewPass?.get('acceptTerm')?.value;
    const gender = this.formNewPass?.get('gender')?.value;
    if (this.email && newPass) {
      this.userService
        .updateUser(this.email, newPass, newEmail, name, mobilePhone, gender)
        .pipe(switchMap(() => this.userService.login(newEmail, newPass)))
        .subscribe({
          next: () =>
            this.userType === 'BENEFIT'
              ? this.goToRegisterBenefit()
              : this.goToRegisterProvider(),
          error: () => {
            this.toast.showErrorSystem();
          },
        });
    } else {
      this.toast.show('Falta dados para atualizar o cadastro');
    }
  }

  private goToRegisterBenefit() {
    this.toast.show('Falta pouco agora ??????');
    this.router.navigate(['/auth/register-benefit', this.email]);
  }

  private goToRegisterProvider() {
    this.toast.show('Falta pouco agora ??????');
    this.router.navigate(['/auth/register-provider', this.email]);
  }

  private createForm() {
    this.formNewPass = this.formBuilder.group({
      newPass: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      name: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      lastName: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      email: this.formBuilder.control('', {
        validators: [Validators.required, Validators.pattern(REGEX_EMAIL)],
      }),
      mobilePhone: this.formBuilder.control('', {
        validators: [Validators.pattern(REGEX_CELL)],
      }),
      gender: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
    });
    this.formNewPass.get('email')?.setValue(this.email);
  }

  private getParams() {
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.userType = this.route.snapshot.queryParamMap.get('user');

    if (!this.userType && this.email) {
      this.toast.show('Acesso negado a essa p??gina');
      this.goBackToLoginPage();
    }
  }

  private verifyIsFirsAccess() {
    if (this.email) {
      this.userService
        .isFirstAccess(this.email)
        .pipe(filter((response) => !response.result))
        .subscribe({
          next: () => {
            this.toast.show('Acesso negado a essa p??gina');
            this.goBackToLoginPage();
          },
          error: () => {
            this.toast.showErrorSystem();
            this.goBackToLoginPage();
          },
        });
    } else {
      this.goBackToLoginPage();
    }
  }

  goBackToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  togglePass() {
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
  }
}
