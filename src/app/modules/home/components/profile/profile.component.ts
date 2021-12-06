import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import * as moment from 'moment';
import { catchError } from 'rxjs';
import { ProviderService } from 'src/app/core/provider/services/provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  pageModel?: {
    name?: string;
    weight?: string;
    height?: string;
    dateBirthFormat?: string;
    dateBirth?: string;
    email?: string;
    bio?: string;
    specialty?: string;
  };
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
      this.goToLogin();
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.benefitService
      .findBenefit(user.email)
      .pipe(catchError(() => this.providerService.findProvider(user.email)))
      .subscribe({
        error: () => this.toast.showErrorSystem(),
        next: (response) => {
          // if ('body' in response) {
          //   const height =
          //     response?.body[response?.body?.length - 1]?.height.toFixed(0);
          //   const weight =
          //     response?.body[response?.body?.length - 1]?.weight.toFixed(0);

          //   const dateBirthMoment = moment(response.birthDate, 'D/M/YYYY');
          //   const dateBirthFormat =
          //     Math.abs(dateBirthMoment.diff(moment(), 'year')) + '';

          //   this.pageModel = {
          //     name: response.name,
          //     height,
          //     weight,
          //     dateBirthFormat,
          //     dateBirth: response.birthDate,
          //     email: user.email,
          //   };
          // } else {
          this.pageModel = {
            name: 'response.name',
            bio: 'response.bio',
            specialty: 'response.specialty',
          };
          // }
        },
      });
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  updateWeight() {
    const newWeight = prompt('Novo peso', '');

    if (
      newWeight &&
      this.pageModel?.email &&
      this.pageModel?.dateBirth &&
      this.pageModel?.height
    ) {
      this.benefitService
        .updateBenefit(
          this.pageModel?.email,
          this.pageModel?.dateBirth,
          +newWeight,
          +this.pageModel?.height
        )
        .subscribe({
          error: () => this.toast.showErrorSystem(),
          next: () => this.toast.show('Peso atualizado'),
        });
    }
  }
}
