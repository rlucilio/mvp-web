import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';
import { confirmPassValidator } from '../validators/confirm-pass.validator';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  typePass: 'text' | 'password' = 'password';
  formNewPass?: FormGroup;
  private params?: {
    email: string | null;
    token: string | null;
  };
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authUserService: UserAuthService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.createForm();

    this.verifyToken();
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

  private verifyToken() {
    if (this.params?.email && this.params.token) {
      this.authUserService
        .verifyTokenChangePass(this.params.email, this.params.token)
        .subscribe({
          next: (response) => {
            if (response.result) {
              console.log('Token ok');
            } else {
              this.goToLoginPage();
            }
          },
          error: () => this.goToLoginPage(),
        });
    }
  }

  private getParams() {
    this.params = {
      email: this.route.snapshot.queryParamMap.get('email'),
      token: this.route.snapshot.queryParamMap.get('token'),
    };
  }

  private goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  changePass() {
    const newPass = this.formNewPass?.get('newPass')?.value;
    if (this.params?.email && this.params?.token && newPass) {
      this.authUserService
        .changePass(this.params.email, newPass, this.params.token)
        .subscribe(() => this.goToLoginPage());
    }
  }

  togglePass() {
    this.typePass = this.typePass === 'text' ? 'password' : 'text';
  }
}
