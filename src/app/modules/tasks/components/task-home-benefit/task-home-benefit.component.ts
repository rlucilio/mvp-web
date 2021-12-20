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
import {
  BenefitService,
  FindBenefitResponse,
  TasksResponse,
} from 'src/app/core/benefit/services/benefit.service';
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
    private readonly dialog: MatDialog
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
                if ((ctx.raw as number) > 50) {
                  return this.createCompleteColor();
                } else {
                  return this.createWaitColor();
                }
              },
              borderWidth: 0,
              borderRadius: Number.MAX_SAFE_INTEGER,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              display: false,
            },
            x: {
              grid: {
                display: false,
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
      const tasksGroup = this.taskService.groupTaskByType(
        tasksGroupType['FOOD']
      );

      this.taskFoodList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) => (result += curr.result ? Number(curr.result) : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected ? Number(curr.expected) : 0),
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
      const tasksGroup = this.taskService.groupTaskByType(
        tasksGroupType['LIFESTYLE']
      );

      this.taskHobbiesList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) => (result += curr.result ? Number(curr.result) : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected ? Number(curr.expected) : 0),
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
      const tasksGroup = this.taskService.groupTaskByType(
        tasksGroupType['WORKOUTS']
      );

      this.taskWorkList = [];
      for (const key in tasksGroup) {
        const execLabel = tasksGroup[key][0].task.input.gain.label2;
        const gain = tasksGroup[key][0].task.input.gain.label;

        const result = tasksGroup[key].reduce(
          (result, curr) => (result += curr.result ? Number(curr.result) : 0),
          0
        );

        const expected = tasksGroup[key].reduce(
          (result, curr) =>
            (result += curr.expected ? Number(curr.expected) : 0),
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
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[1]
              ? groupByDayWeek[1].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[2]
              ? groupByDayWeek[2].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[3]
              ? groupByDayWeek[3].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[4]
              ? groupByDayWeek[4].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[5]
              ? groupByDayWeek[5].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
            groupByDayWeek[6]
              ? groupByDayWeek[6].reduce(
                  (result, curr) => (result += Number(curr.result)),
                  0
                )
              : 0,
          ];
        }
      },
    });
  }

  markDone(task: TaskPageModel) {
    if (task.percent >= 100) {
      this.dialog.open(DialogTaskComponent, {
        width: '315px',
        data: task,
      });
    }
  }
}
