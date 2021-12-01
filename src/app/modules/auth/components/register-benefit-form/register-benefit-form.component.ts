import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';

@Component({
  selector: 'app-register-benefit-form',
  templateUrl: './register-benefit-form.component.html',
  styleUrls: ['./register-benefit-form.component.scss'],
})
export class RegisterBenefitFormComponent implements OnInit {
  private email?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly benefitService: BenefitService,
    private readonly router: Router
  ) {}

  //TODO: Fazer tela
  ngOnInit(): void {
    this.getParams();
  }

  private getParams() {
    this.email = this.route.snapshot.paramMap.get('email') || '';

    if (!this.email) {
      this.goToLoginPage();
    }
  }

  goToLoginPage() {
    this.router.navigate(['/auth/login']);
  }

  goToSuccessPage() {
    this.router.navigate(['/auth/register-form']);
  }
}
