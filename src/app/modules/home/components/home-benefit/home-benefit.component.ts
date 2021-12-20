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
} from 'src/app/core/benefit/services/benefit.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { DialogAddTasksComponent } from 'src/app/modules/tasks/components/dialog-add-tasks/dialog-add-tasks.component';
import { DialogTaskComponent } from 'src/app/modules/tasks/components/dialog-task/dialog-task.component';
import { TaskService } from 'src/app/modules/tasks/services/task.service';
import { TaskPageModel } from './task-page-model';

@Component({
  selector: 'app-home-benefit',
  templateUrl: './home-benefit.component.html',
  styleUrls: ['./home-benefit.component.scss'],
})
export class HomeBenefitComponent implements OnInit, AfterViewInit {
  pageModel: {
    name?: string;
    schedules?: {
      specialty: string;
      dateTime: string;
      link: string;
    }[];
    tasks?: TaskPageModel[];
    tasksResultGraph?: number[];
  } = {};
  @ViewChild('chart') ctxCanvas?: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly schedule: ScheduleService,
    private readonly taskService: TaskService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userStorage = this.storage.get(KEY_USER);

    if (userStorage) {
      const user = JSON.parse(userStorage) as { email: string };
      this.getBenefitDetails(user);
      this.getSchedules(user);
    } else {
      this.toast.showErrorSystem();
      this.storage.clear();
    }
  }

  private getSchedules(user: { email: string }) {
    this.schedule.getScheduleByBenefit(user.email).subscribe({
      error: () => this.toast.showErrorSystem(),
      next: (res) => {
        this.pageModel.schedules = res.map((scheduleResponse) => {
          const dateTime = moment(
            scheduleResponse.schedule.dateTime,
            'DD/MM/YYYY HH:mm'
          ).format('DD/MM, HH:mm');

          return {
            specialty: scheduleResponse.provider.specialty,
            dateTime,
            link: scheduleResponse.schedule.room,
          };
        });
      },
    });
  }

  private getBenefitDetails(user: { email: string }) {
    this.benefitService.findBenefit(user.email).subscribe({
      error: () => {
        this.toast.showErrorSystem();
        this.storage.clear();
        this.router.navigate(['/auth/login']);
      },
      next: (res) => {
        this.getDetailsBenefit(res);

        if (res.plan) {
          this.getTasks(res);

          const lastWeek = moment(new Date()).subtract(1, 'week');
          const now = moment(new Date());
          const lastsTasks = res.plan.tasks.filter((task) =>
            moment(task.dateExpected, 'DD/MM/YYYY').isBetween(lastWeek, now)
          );

          const groupByDayWeek =
            this.taskService.groupTaskByDayWeek(lastsTasks);

          this.pageModel.tasksResultGraph = [
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

  private getTasks(res: FindBenefitResponse) {
    const tasksGroup = this.taskService.groupTaskByName(res.plan.tasks);
    const tasks = [];
    this.pageModel.tasks = [];

    for (const key in tasksGroup) {
      const execLabel = `${tasksGroup[key].length} tarefas`;

      const gain = `${tasksGroup[key][0].task.input.gain.value} ${tasksGroup[key][0].task.input.gain.label}`;

      const result = tasksGroup[key].reduce(
        (result, curr) => (result += curr.result ? Number(curr.result) : 0),
        0
      );

      const expected = tasksGroup[key].reduce(
        (result, curr) => (result += curr.expected ? Number(curr.expected) : 0),
        0
      );

      const percent = (100 * result) / expected;

      tasks.push({
        title: tasksGroup[key][0].task.input.label,
        type: tasksGroup[key][0].task.type,
        id: tasksGroup[key][0].task._id,
        execLabel,
        gain,
        percent,
        task: tasksGroup[key][0],
      });
    }

    this.pageModel.tasks = tasks.slice(0, 3);
  }

  private getDetailsBenefit(res: FindBenefitResponse) {
    this.pageModel.name = res.name;
  }

  ngAfterViewInit(): void {
    if (this.pageModel.tasksResultGraph && this.ctxCanvas?.nativeElement) {
      Chart.register(...registerables);

      this.chart = new Chart(this.ctxCanvas?.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          datasets: [
            {
              data: this.pageModel.tasksResultGraph,
              backgroundColor: (ctx) => {
                if (ctx.dataIndex % 2 === 0) {
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
          backgroundColor: 'green',
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

  goToPageTask() {
    this.router.navigate(['/home/tasks/benefit']);
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
