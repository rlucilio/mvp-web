import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { ProviderService } from 'src/app/core/provider/services/provider.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly benefitService: BenefitService,
    private readonly providerService: ProviderService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) {
      this.storage.clear();
      this.router.navigate(['/auth']);
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.benefitService
      .findBenefit(user.email)
      .pipe(catchError(() => this.providerService.findProvider(user.email)))
      .subscribe({
        error: () => {
          this.storage.clear();
          this.router.navigate(['/auth']);
          this.toast.showErrorSystem();
        },
        next: (response) => {
          if ('body' in response) {
            if (!response.birthDate) {
              this.router.navigate(['/auth/register-benefit', user.email]);
            }
          } else {
            if (!response.bio) {
              this.router.navigate(['/auth/register-benefit', user.email]);
            }
          }
        },
      });
  }
}
