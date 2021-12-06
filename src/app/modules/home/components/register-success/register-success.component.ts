import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
})
export class RegisterSuccessComponent implements OnInit {
  public nameBenefit?: string;
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    const user: { email: string } = JSON.parse(this.storage.get('user') || '');
    this.benefitService.findBenefit(user.email).subscribe({
      error: () => this.toast.showErrorSystem(),
      next: (response) => (this.nameBenefit = response.name),
    });
  }

  goToHome() {
    //TODO: Add navegação
    this.router.navigate([]);
  }
}
