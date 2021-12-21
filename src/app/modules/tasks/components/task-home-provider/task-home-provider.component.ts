import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  BenefitService,
  FindBenefitResponse,
} from 'src/app/core/benefit/services/benefit.service';
import { KEY_BENEFIT_STORAGE } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import {
  GetSchedulesResponseByBenefit,
  ScheduleService,
} from 'src/app/modules/schedule/services/schedule.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-home-provider',
  templateUrl: './task-home-provider.component.html',
  styleUrls: ['./task-home-provider.component.scss'],
})
export class TaskHomeProviderComponent implements OnInit {
  pageModel: {
    benefit?: FindBenefitResponse;
    schedules?: GetSchedulesResponseByBenefit[];
  } = {};
  constructor(
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly scheduleService: ScheduleService,
    private readonly taskService: TaskService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    const benefitStorageStr = this.storage.get(KEY_BENEFIT_STORAGE);

    if (benefitStorageStr) {
      const benefitStorage: FindBenefitResponse = JSON.parse(benefitStorageStr);

      this.benefitService.findBenefit(benefitStorage.email).subscribe({
        error: () => {
          this.router.navigate(['/main/provider']);
          this.toast.showErrorSystem();
        },
        next: (res) => (this.pageModel.benefit = res),
      });

      this.scheduleService
        .getScheduleByBenefit(benefitStorage.email)
        .subscribe({
          error: () => this.toast.showErrorSystem(),
          next: (res) => (this.pageModel.schedules = res),
        });
    } else {
      this.router.navigate(['/main/provider']);
    }
  }

  get percentage() {
    if (this.pageModel.benefit) {
      const result = this.pageModel.benefit?.plan
        ? 0
        : this.pageModel.benefit.plan.tasks.reduce(
            (result, task) =>
              (result +=
                typeof task.result === 'boolean'
                  ? Number(task.expected === task.result)
                  : Number(task.result)),
            0
          );

      const expected = !this.pageModel.benefit.plan
        ? 0
        : this.pageModel.benefit.plan.tasks.reduce(
            (result, task) =>
              (result +=
                typeof task.result === 'boolean' ? 1 : Number(task.expected)),
            0
          );

      return (100 * result) / expected;
    } else {
      return 0;
    }
  }

  get weight() {
    return this.pageModel.benefit?.body[this.pageModel.benefit?.body.length - 1]
      .weight;
  }

  get height() {
    return this.pageModel.benefit?.body[this.pageModel.benefit?.body.length - 1]
      .height;
  }

  get yearsBenefit() {
    const dateBirthMoment = moment(
      this.pageModel.benefit?.birthDate,
      'D/M/YYYY'
    );
    const dateBirthFormat =
      Math.abs(dateBirthMoment.diff(moment(), 'year')) + '';
    return dateBirthFormat;
  }

  get schedules() {
    return this.pageModel.schedules?.filter(
      (schedule) => schedule.schedule.status === 'CRIADO'
    );
  }

  formatDateSchedule(date: string) {
    return moment(date, 'DD/MM/YYYY HH:mm').format('DD/MM, HH:mm');
  }

  get listHobbies() {
    if (this.pageModel.benefit?.plan.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType(
        this.pageModel.benefit?.plan.tasks
      );

      if (tasksGroupType['LIFESTYLE']) {
        const tasksGroup = this.taskService.groupTaskByName(
          tasksGroupType['LIFESTYLE']
        );

        const taskFoodList = [];
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

          taskFoodList.push({
            title: tasksGroup[key][0].task.input.label,
            type: tasksGroup[key][0].task.type,
            id: tasksGroup[key][0].task._id,
            execLabel,
            gain,
            percent,
            task: tasksGroup[key][0],
          });
        }

        return taskFoodList;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  get listWork() {
    if (this.pageModel.benefit?.plan.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType(
        this.pageModel.benefit?.plan.tasks
      );

      if (tasksGroupType['WORKOUTS']) {
        const tasksGroup = this.taskService.groupTaskByName(
          tasksGroupType['WORKOUTS']
        );

        const taskFoodList = [];
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

          taskFoodList.push({
            title: tasksGroup[key][0].task.input.label,
            type: tasksGroup[key][0].task.type,
            id: tasksGroup[key][0].task._id,
            execLabel,
            gain,
            percent,
            task: tasksGroup[key][0],
          });
        }

        return taskFoodList;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  get listFood() {
    if (this.pageModel.benefit?.plan.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType(
        this.pageModel.benefit?.plan.tasks
      );

      if (tasksGroupType['FOOD']) {
        const tasksGroup = this.taskService.groupTaskByName(
          tasksGroupType['FOOD']
        );

        const taskFoodList = [];
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

          taskFoodList.push({
            title: tasksGroup[key][0].task.input.label,
            type: tasksGroup[key][0].task.type,
            id: tasksGroup[key][0].task._id,
            execLabel,
            gain,
            percent,
            task: tasksGroup[key][0],
          });
        }

        return taskFoodList;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  goToTaskList() {
    this.router.navigate(['/tasks/provider/benefit']);
  }
}
