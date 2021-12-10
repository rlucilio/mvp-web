import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { ProviderService } from 'src/app/core/provider/services/provider.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
})
export class RegisterSuccessComponent implements OnInit {
  public nameBenefit?: string;
  hiddenMarkSchedule = false;
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly providerService: ProviderService,
    private readonly toast: ToastService,
    private readonly schedule: ScheduleService
  ) {}

  ngOnInit(): void {
    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) {
      this.goToLogin();
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.benefitService
      .findBenefit(user.email)
      .pipe(
        catchError(() => {
          this.hiddenMarkSchedule = true;
          return this.providerService
            .findProvider(user.email)
            .pipe(tap(() => (this.hiddenMarkSchedule = true)));
        })
      )
      .subscribe({
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            this.hiddenMarkSchedule = true;
          } else {
            this.storage.clear();
            this.goToLogin();
            this.toast.showErrorSystem();
          }
        },
        next: (response) => {
          this.nameBenefit = response.name;
        },
      });

    this.schedule
      .getScheduleByBenefit(user.email)
      .subscribe(
        (response) => (this.hiddenMarkSchedule = !!(response.length > 0))
      );
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  goToSchedule() {
    this.router.navigateByUrl(
      '/schedule/list?specialty=Enfermeira(o)&first=true'
    );
  }
}
