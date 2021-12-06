import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { KEY_USER } from 'src/app/core/shared/constants';
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
    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) {
      this.goToLogin();
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.benefitService.findBenefit(user.email).subscribe({
      error: () => this.toast.showErrorSystem(),
      next: (response) => (this.nameBenefit = response.name),
    });
  }

  goToHome() {
    //TODO: Add navegação
    this.router.navigate([]);
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }
}
