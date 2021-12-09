import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
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
  isBenefit = false;
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
      error: (error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.NotFound) {
          this.isBenefit = false;
        } else {
          this.storage.clear();
          this.goToLogin();
          this.toast.showErrorSystem();
        }
      },
      next: (response) => {
        this.isBenefit = true;
        this.nameBenefit = response.name;
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  goToSchedule() {
    this.router.navigate(['/schedule/list?specialty=NURSE&first=true']);
  }
}
