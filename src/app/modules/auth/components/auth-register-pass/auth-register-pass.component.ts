import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';
import { confirmPassValidator } from '../../validators/confirm-pass.validator';

@Component({
  selector: 'app-auth-register-pass',
  templateUrl: './auth-register-pass.component.html',
  styleUrls: ['./auth-register-pass.component.scss'],
})
export class AuthRegisterPassComponent implements OnInit {
  typePass: 'text' | 'password' = 'password';
  private email?: string;
  formNewPass?: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserAuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.createForm();

    this.verifyIsFirsAccess();
  }

  registerPass() {
    const newPass = this.formNewPass?.get('newPass')?.value;
    if (this.email && newPass) {
      this.userService.createPass(this.email, newPass).subscribe({
        next: () => this.goBackToLoginPage(),
        error: () => this.goBackToLoginPage(),
      });
    } else {
      this.goBackToLoginPage();
    }
  }

  private createForm() {
    this.formNewPass = this.formBuilder.group({
      newPass: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      newPassConfirm: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(4)],
      }),
    });

    this.formNewPass.addValidators(confirmPassValidator);
  }

  private getParams() {
    this.email = this.route.snapshot.paramMap.get('email') || '';
  }

  private verifyIsFirsAccess() {
    if (this.email) {
      this.userService
        .isFirstAccess(this.email)
        .pipe(filter((response) => !response.result))
        .subscribe({
          next: () => this.goBackToLoginPage(),
          error: () => this.goBackToLoginPage(),
        });
    } else {
      this.goBackToLoginPage();
    }
  }

  private goBackToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  togglePass() {
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
  }
}
