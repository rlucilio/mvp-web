import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs';
import { TasksResponse } from 'src/app/core/benefit/services/benefit.service';
import { environment } from 'src/environments/environment';

interface ResultGroupBy<T> {
  [key: string | number]: T[];
}

interface ResultGroupByString {
  [key: string]: TasksResponse[];
}

interface ResultGroupByNumber {
  [key: number]: TasksResponse[];
}

@Injectable()
export class TaskService {
  private readonly URL = `${environment.urlServe}/tasks`;
  constructor(
    private readonly http: HttpClient,
    private readonly spinner: NgxSpinnerService
  ) {}

  getTasksByBenefit(email: string) {}

  groupTaskByName(array: Array<TasksResponse>): ResultGroupByString {
    return array.reduce((result, curr) => {
      (result[curr.task.name] = result[curr.task.name] || []).push(curr);
      return result;
    }, {} as any);
  }

  groupTaskByDayWeek(array: Array<TasksResponse>): ResultGroupByNumber {
    return array.reduce((result, curr) => {
      const dayWeek = moment(curr.dateExpected, 'DD/MM/YYYY').isoWeekday();
      (result[dayWeek] = result[dayWeek] || []).push(curr);
      return result;
    }, {} as any);
  }

  groupBy<T, Key extends keyof T>(array: Array<T>, key: Key): ResultGroupBy<T> {
    return array.reduce((result, curr: T) => {
      (result[curr[key]] = result[curr[key]] || []).push(curr);
      return result;
    }, {} as any);
  }

  markTask(email: string, task: string, value: number | boolean) {
    this.spinner.show();
    return this.http
      .put<{ needFeedBack: boolean }>(`${this.URL}/plan/task`, {
        email,
        task,
        value,
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
