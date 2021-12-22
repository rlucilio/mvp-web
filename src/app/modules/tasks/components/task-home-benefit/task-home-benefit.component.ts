import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { FindBenefitResponse } from 'src/app/core/benefit/services/responses-benefit';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { TaskPageModel } from 'src/app/modules/home/components/home-benefit/task-page-model';
import { TaskService } from '../../services/task.service';
import { DialogFeedbackComponent } from '../dialog-feedback/dialog-feedback.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-task-home-benefit',
  templateUrl: './task-home-benefit.component.html',
  styleUrls: ['./task-home-benefit.component.scss'],
})
export class TaskHomeBenefitComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') ctxCanvas?: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  taskWorkList?: TaskPageModel[];
  taskFoodList?: TaskPageModel[];
  taskHobbiesList?: TaskPageModel[];
  tasksResultGraph?: number[];

  constructor(
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly taskService: TaskService,
    private readonly dialog: MatDialog,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    const userStorage = this.storage.get(KEY_USER);

    if (userStorage) {
      const user = JSON.parse(userStorage) as { email: string };
      this.getBenefit(user);
    } else {
      this.toast.showErrorSystem();
      this.storage.clear();
    }
  }

  ngAfterViewInit(): void {
    if (this.ctxCanvas?.nativeElement && this.tasksResultGraph) {
      Chart.register(...registerables);

      this.chart = new Chart(this.ctxCanvas?.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          datasets: [
            {
              data: this.tasksResultGraph,
              backgroundColor: (ctx) => {
                if (ctx.dataIndex % 2 === 0) {
                  return this.createCompleteColor();
                } else {
                  return this.createWaitColor();
                }
              },
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          backgroundColor: 'green',
          scales: {
            y: {
              beginAtZero: true,
              display: true,
            },
            x: {
              grid: {
                display: true,
                lineWidth: 0,
              },
            },
          },
        },
      });
    }
  }

  private createCompleteColor() {
    const successColor = (this.ctxCanvas?.nativeElement as HTMLCanvasElement)
      ?.getContext('2d')
      ?.createLinearGradient(600, 100, 0, 100);

    successColor?.addColorStop(0, 'rgba(198, 103, 32, 1)');
    successColor?.addColorStop(1, 'rgba(240, 165, 8, 1)');

    return successColor;
  }

  private createWaitColor() {
    const successColor = (this.ctxCanvas?.nativeElement as HTMLCanvasElement)
      ?.getContext('2d')
      ?.createLinearGradient(600, 100, 0, 100);

    successColor?.addColorStop(0, '#C58BF2');
    successColor?.addColorStop(1, '#EEA4CE');
    return successColor;
  }

  openDialogMarkDone() {
    this.dialog.open(DialogTaskComponent, {
      width: '315px',
      data: {},
    });
  }

  private getTasks(res: FindBenefitResponse) {
    const tasksGroupType = this.taskService.groupTaskByType(res.plan.tasks);

    if (tasksGroupType['FOOD']) {
      const tasksGroup = this.taskService.groupTaskByName(
        tasksGroupType['FOOD']
      );

      this.taskFoodList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.result
              ? typeof curr.result === 'boolean'
                ? Number(curr.expected === curr.result)
                : Number(curr.result)
              : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected
              ? typeof curr.result === 'boolean'
                ? 1
                : Number(curr.expected)
              : 0),
          0
        );

        const percent = (100 * result) / expected;

        this.taskFoodList.push({
          title: tasksGroup[key][0].task.input.label,
          type: tasksGroup[key][0].task.type,
          id: tasksGroup[key][0].task._id,
          execLabel,
          gain,
          percent,
          task: tasksGroup[key][0],
        });
      }
    }

    if (tasksGroupType['LIFESTYLE']) {
      const tasksGroup = this.taskService.groupTaskByName(
        tasksGroupType['LIFESTYLE']
      );

      this.taskHobbiesList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.result
              ? typeof curr.result === 'boolean'
                ? Number(curr.expected === curr.result)
                : Number(curr.result)
              : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected
              ? typeof curr.result === 'boolean'
                ? 1
                : Number(curr.expected)
              : 0),
          0
        );

        const percent = (100 * result) / expected;

        this.taskHobbiesList.push({
          title: tasksGroup[key][0].task.input.label,
          type: tasksGroup[key][0].task.type,
          id: tasksGroup[key][0].task._id,
          execLabel,
          gain,
          percent,
          task: tasksGroup[key][0],
        });
      }
    }

    if (tasksGroupType['WORKOUTS']) {
      const tasksGroup = this.taskService.groupTaskByName(
        tasksGroupType['WORKOUTS']
      );

      this.taskWorkList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.result
              ? typeof curr.result === 'boolean'
                ? Number(curr.expected === curr.result)
                : Number(curr.result)
              : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected
              ? typeof curr.result === 'boolean'
                ? 1
                : Number(curr.expected)
              : 0),
          0
        );

        const percent = (100 * result) / expected;

        this.taskWorkList.push({
          title: tasksGroup[key][0].task.input.label,
          type: tasksGroup[key][0].task.type,
          id: tasksGroup[key][0].task._id,
          execLabel,
          gain,
          percent,
          task: tasksGroup[key][0],
        });
      }
    }
  }

  private getBenefit(user: { email: string }) {
    this.benefitService.findBenefit(user.email).subscribe({
      error: () => {
        this.toast.showErrorSystem();
        this.storage.clear();
        this.router.navigate(['/auth/login']);
      },
      next: (res) => {
        if (res.plan) {
          if (!res.plan.tasks.length) {
            this.toast.show('Plano sem tarefas ainda');
            this._location.back();
          }

          this.getTasks(res);

          const lastWeek = moment(new Date()).subtract(1, 'week');
          const now = moment(new Date());
          const lastsTasks = res.plan.tasks.filter((task) =>
            moment(task.dateExpected, 'DD/MM/YYYY').isBetween(lastWeek, now)
          );

          const groupByDayWeek =
            this.taskService.groupTaskByDayWeek(lastsTasks);

          this.tasksResultGraph = [
            groupByDayWeek[0]
              ? groupByDayWeek[0].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[1]
              ? groupByDayWeek[1].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[2]
              ? groupByDayWeek[2].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[3]
              ? groupByDayWeek[3].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[4]
              ? groupByDayWeek[4].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[5]
              ? groupByDayWeek[5].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[6]
              ? groupByDayWeek[6].reduce(
                  (result, curr) =>
                    (result +=
                      typeof curr.result === 'boolean'
                        ? Number(curr.expected === curr.result)
                        : Number(curr.result)),
                  0
                )
              : 0,
          ];
        } else {
          this.toast.show('Plano não iniciado!');
          this._location.back();
        }

        setTimeout(() => {
          this.ngAfterViewInit();
        }, 1000);
      },
    });
  }

  markDone(task: TaskPageModel) {
    if (task.percent <= 100) {
      this.dialog
        .open(DialogTaskComponent, {
          width: '315px',
          data: task,
        })
        .afterClosed()
        .subscribe(() => {
          this.ngOnInit();
          this.ngAfterViewInit();
        });
    }
  }
}
