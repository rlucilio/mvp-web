import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TasksResponse {
  result?: number | boolean;
  expected: number | boolean;
  dateExpected: string;
  updateDate: Date;
  status: 'STARTED' | 'WAIT' | 'FINISH';
  task: {
    _id: string;
    type: string;
    name: string;
    description: string;
    input: {
      type: string;
      label: string;
      check: {
        falseLabel: string;
        trueLabel: string;
      };
      count: {
        min: number;
        max: number;
        default: number;
        multiplesLabel: string;
        uniqueLabel: string;
      };
      gain: {
        label: string;
        value: number;
      };
    };
  };
}

export interface FindBenefitResponse {
  answeredForm: boolean;
  questions: {
    question: string;
    answer: string;
  }[];
  birthDate: string;
  body: {
    weight: number;
    height: number;
  }[];
  emotional: {
    npsEmotional: number;
  }[];
  email: string;
  gender: string;
  name: string;
  phone: string;
  urlPhoto: string;
  plan: {
    beginDate: string;
    endDate: string;
    tasks: TasksResponse[];
  };
}
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
