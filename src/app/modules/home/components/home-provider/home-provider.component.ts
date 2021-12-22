import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
} from 'rxjs';
import { FindBenefitResponse } from 'src/app/core/benefit/services/responses-benefit';
import { ProviderService } from 'src/app/core/provider/services/provider.service';
import { KEY_BENEFIT_STORAGE, KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { StartPlanComponent } from 'src/app/modules/tasks/components/start-plan/start-plan.component';

@Component({
  selector: 'app-home-provider',
  templateUrl: './home-provider.component.html',
  styleUrls: ['./home-provider.component.scss'],
})
export class HomeProviderComponent implements OnInit {
  $filterBenefit: Subject<Event> = new Subject();
  filterBenefit?: string;
  pageModel: {
    name?: string;
    benefits?: FindBenefitResponse[];
    percent?: number;
  } = {};

  constructor(
    private readonly providerService: ProviderService,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly toast: ToastService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.$filterBenefit
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe((value: string) => (this.filterBenefit = value));

    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) this.router.navigate(['/auth/login']);
    const user: { email: string } = JSON.parse(userStorage);

    this.providerService.findProvider(user.email).subscribe({
      error: () => this.toast.showErrorSystem(),
      next: (res) => {
        this.pageModel.name = res.name;
        this.pageModel.benefits = res.benefits;
      },
    });
  }

  getPercentage(benefit: FindBenefitResponse) {
    const result = !benefit.plan
      ? 0
      : benefit.plan.tasks.reduce(
          (result, task) =>
            (result +=
              typeof task.result === 'boolean'
                ? Number(task.expected === task.result)
                : Number(task.result)),
          0
        );

    const expected = !benefit.plan
      ? 0
      : benefit.plan.tasks.reduce(
          (result, task) =>
            (result +=
              typeof task.result === 'boolean' ? 1 : Number(task.expected)),
          0
        );

    return (100 * result) / expected;
  }

  goToBenefit(benefit: FindBenefitResponse) {
    if (benefit.plan) {
      this.storage.set(KEY_BENEFIT_STORAGE, JSON.stringify(benefit));
      this.router.navigate(['/home/tasks/provider']);
    } else {
      this.dialog.open(StartPlanComponent, {
        width: '315px',
        data: benefit,
      });
    }
  }

  get benefits() {
    if (this.filterBenefit && this.pageModel.benefits) {
      return this.pageModel.benefits?.filter((benefit) =>
        benefit.name
          .toUpperCase()
          .includes(this.filterBenefit?.toUpperCase().trim() || '')
      );
    } else {
      return this.pageModel.benefits ? this.pageModel.benefits : [];
    }
  }
}
