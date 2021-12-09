import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../storage/services/storage.service';

@Injectable()
export class BenefitService {
  private readonly BASE_URL = `${environment.urlServe}/benefit`;
  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
    private readonly spinner: NgxSpinnerService
  ) {}

  updateBenefit(
    email: string,
    dateBirth: string,
    weight: number,
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
      .get<{
        birthDate: string;
        body: {
          weight: number;
          height: number;
        }[];
        email: string;
        gender: string;
        name: string;
        phone: string;
      }>(`${this.BASE_URL}/find?email=${email}`)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
