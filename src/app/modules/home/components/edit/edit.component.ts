import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { ProviderService } from 'src/app/core/provider/services/provider.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  formBenefit?: FormGroup;
  pageModel?: {
    name?: string;
    lastName?: string;
    email?: string;
    height?: string;
    weight?: number;
    specialty?: string;
    dateBirth?: string;
    bio?: string;
  };
  constructor(
    private readonly fb: FormBuilder,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly benefitService: BenefitService,
    private readonly providerService: ProviderService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.formBenefit = this.fb.group({
      weight: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });

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
            const height =
              response?.body[response?.body?.length - 1]?.height.toFixed(0);
            const weight = response?.body[response?.body?.length - 1]?.weight;

            const names = response.name.split(' ');
            this.pageModel = {
              name: response.name.split(' ')[0],
              lastName: names.join(' '),
              height,
              weight,
              email: user.email,
              dateBirth: response.birthDate,
            };

            this.formBenefit?.get('weight')?.setValue(weight);
            this.formBenefit?.get('bio')?.clearValidators();
          } else {
            const names = response.name.split(' ');
            this.pageModel = {
              name: response.name.split(' ')[0],
              lastName: names.join(' '),
              email: response.email,
              specialty: response.specialty,
              bio: response.bio,
            };

            this.formBenefit?.get('bio')?.setValue(response.bio);
            this.formBenefit?.get('weight')?.clearValidators();
          }
        },
      });
  }

  edit() {
    const bio = this.formBenefit?.get('bio')?.value;
    const newWeight = this.formBenefit?.get('weight')?.value;
    if (this.pageModel?.specialty && this.pageModel?.email && bio) {
      this.providerService.updateProvider(this.pageModel.email, bio).subscribe({
        error: () => this.toast.showErrorSystem(),
        next: () => {
          this.router.navigate(['home/profile']);
          this.toast.show('Biografia atualizado');
        },
      });
    } else {
      if (
        newWeight &&
        this.pageModel?.email &&
        this.pageModel?.dateBirth &&
        this.pageModel?.height
      ) {
        this.pageModel.weight = newWeight;
        this.benefitService
          .updateBenefit(
            this.pageModel?.email,
            this.pageModel?.dateBirth,
            +newWeight,
            +this.pageModel?.height
          )
          .subscribe({
            error: () => this.toast.showErrorSystem(),
            next: () => {
              this.router.navigate(['home/profile']);
              this.toast.show('Peso atualizado');
            },
          });
      }
    }
  }
}
