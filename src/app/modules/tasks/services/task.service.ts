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

interface ResultGroup {
  [key: string]: ResponseFindAllTasks[];
}

interface ResultGroupByNumber {
  [key: number]: TasksResponse[];
}

interface Input {
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
    label2: number;
  };
}

export interface ResponseFindAllTasks {
  type: string;
  name: string;
  description: string;
  input: Input;
  _id: string;
}

@Injectable({ providedIn: 'root' })
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

  groupTaskByName2(array: Array<ResponseFindAllTasks>): ResultGroup {
    return array.reduce((result, curr) => {
      (result[curr.name] = result[curr.name] || []).push(curr);
      return result;
    }, {} as any);
  }

  groupTaskByType(array: Array<TasksResponse>): ResultGroupByString {
    return array.reduce((result, curr) => {
      (result[curr.task.type] = result[curr.task.type] || []).push(curr);
      return result;
    }, {} as any);
  }

  groupTaskByType2(array: Array<ResponseFindAllTasks>): ResultGroup {
    return array.reduce((result, curr) => {
      (result[curr.type] = result[curr.type] || []).push(curr);
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

  startPlan(email: string, startDate: string, endDate: string) {
    this.spinner.show();
    return this.http
      .post<{ needFeedBack: boolean }>(`${this.URL}/plan`, {
        email,
        startDate,
        endDate,
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  getAllTasks() {
    this.spinner.show();
    return this.http.get<ResponseFindAllTasks[]>(this.URL).pipe(
      first(),
      finalize(() => this.spinner.hide())
    );
  }

  removeTaskInPlan(email: string, task: string) {
    this.spinner.show();
    return this.http
      .delete<{ needFeedBack: boolean }>(
        `${this.URL}/plan/task?email=${email}&task=${task}`
      )
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }

  addTask(
    body: {
      task: string;
      email: string;
      expected: number | boolean;
      date: string;
    }[]
  ) {
    this.spinner.show();
    return this.http
      .post<{ needFeedBack: boolean }>(`${this.URL}/plan`, body)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      );
  }
}
