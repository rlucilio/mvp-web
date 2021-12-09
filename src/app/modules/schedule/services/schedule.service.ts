import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ResponseSchedule {
  cod: string;
  room: string;
  dateTime: string;
  status: string;
  provider: {
    specialty: string;
    email: string;
    name: string;
    state: string;
  };
}

@Injectable()
export class ScheduleService {
  private readonly URL = `${environment.urlServe}/schedule`;
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService
  ) {}

  getSchedules(specialty: string = 'ALL') {
    this.spinner.show();
    return this.http
      .get<ResponseSchedule[]>(`${this.URL}?specialty=${specialty}`)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  createSchedule(schedule: ResponseSchedule, benefitEmail: string) {
    this.spinner.show();
    return this.http
      .post(`${this.URL}`, { cod: schedule.cod, email: benefitEmail })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
