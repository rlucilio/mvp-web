import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/user-auth/services/user-auth.service';

@Component({
  selector: 'app-register-benefit',
  templateUrl: './register-benefit.component.html',
  styleUrls: ['./register-benefit.component.scss'],
})
export class RegisterBenefitComponent implements OnInit {
  private email?: string;
  formBenefit?: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserAuthService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getParams();

    this.createForm();
  }

  private getParams() {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    if (!this.email) {
      this.goToLoginPage();
    }
  }

  private createForm() {
    this.formBenefit = this.formBuilder.group({
      dateBirth: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      weight: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
      height: this.formBuilder.control('', {
        validators: [Validators.required],
      }),
    });
  }

  updateBenefit() {
    const dateBirth = this.formBenefit?.get('dateBirth')?.value();
    const weight = this.formBenefit?.get('weight')?.value();
    const height = this.formBenefit?.get('wheighteight')?.value();
    if (this.email && this.formBenefit?.valid) {
      this.userService.updateBenefit(this.email, dateBirth, weight, height);
    }
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }
}
