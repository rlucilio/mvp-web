import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';

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
    private readonly benefitService: BenefitService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastService
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
      this.benefitService
        .updateBenefit(this.email, dateBirth, weight, height)
        .subscribe({
          next: () => this.goToRegisterForm(),
          error: () => this.toast.show('Erro ao atualizar os dados'),
        });
    }
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  goToRegisterForm() {
    this.router.navigate(['/auth/register-form', this.email]);
  }
}
