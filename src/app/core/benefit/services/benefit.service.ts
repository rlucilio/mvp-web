import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindBenefitResponse } from './responses-benefit';

@Injectable()
export class BenefitService {
  private readonly BASE_URL = `${environment.urlServe}/benefit`;
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService
  ) {}

  updateBenefit(
    email: string,
    dateBirth: string,
    weight: string,
    height: number
  ) {
    this.spinner.show();
    return this.http
      .put<void>(
        `${this.BASE_URL}/update`,
        {
          email,
          dateBirth,
          weight,
          height,
        },
        { headers: { KEY_ACCESS_TOKEN: '' } }
      )
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  findBenefit(email: string) {
    this.spinner.show();

    return this.http
      .get<FindBenefitResponse>(`${this.BASE_URL}/find?email=${email}`)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  sendFeedBack(email: string, nps: number) {
    this.spinner.show();

    return this.http.put(`${this.BASE_URL}/emotional`, { email, nps }).pipe(
      first(),
      finalize(() => this.spinner.hide())
    );
  }
}
