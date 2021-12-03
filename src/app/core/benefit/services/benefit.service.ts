import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BenefitService {
  private readonly BASE_URL = `${environment.urlServe}/benefit`;
  constructor(private readonly http: HttpClient) {}

  updateBenefit(
    email: string,
    dateBirth: Date,
    weight: number,
    height: number
  ) {
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
      .pipe(first());
  }

  findBenefit(email: string) {
    return this.http
      .get<void>(`${this.BASE_URL}/find?email=${email}`)
      .pipe(first());
  }
}
