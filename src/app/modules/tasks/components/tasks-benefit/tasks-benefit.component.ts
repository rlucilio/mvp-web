import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { FindBenefitResponse } from 'src/app/core/benefit/services/responses-benefit';
import { KEY_BENEFIT_STORAGE } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { ResponseGetAllTasks, TaskService } from '../../services/task.service';
import { DialogAddTasksComponent } from '../dialog-add-tasks/dialog-add-tasks.component';

@Component({
  selector: 'app-tasks-benefit',
  templateUrl: './tasks-benefit.component.html',
  styleUrls: ['./tasks-benefit.component.scss'],
})
export class TasksBenefitComponent implements OnInit {
  pageModel: {
    tasks?: ResponseGetAllTasks[];
    benefit?: FindBenefitResponse;
  } = {};

  constructor(
    private readonly dialog: MatDialog,
    private readonly taskService: TaskService,
    private readonly toast: ToastService,
    private readonly _location: Location,
    private readonly storage: StorageService,
    private readonly benefitService: BenefitService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      error: () => this.toast.showErrorSystem(),
      next: (res) => (this.pageModel.tasks = res),
    });

    this.getBenefit();
  }

  private getBenefit() {
    const benefitStorageStr = this.storage.get(KEY_BENEFIT_STORAGE);

    if (benefitStorageStr) {
      const benefitStorage = JSON.parse(
        benefitStorageStr
      ) as FindBenefitResponse;

      this.benefitService.findBenefit(benefitStorage.email).subscribe({
        error: () => {
          this.router.navigate(['/main/provider']);
          this.toast.showErrorSystem();
        },
        next: (res) => (this.pageModel.benefit = res),
      });
    }
  }

  get listHobbies() {
    if (this.pageModel.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType2(
        this.pageModel.tasks
      );

      if (tasksGroupType['LIFESTYLE']) {
        const tasksGroup = this.taskService.groupTaskByName2(
          tasksGroupType['LIFESTYLE']
        );

        const taskFoodList = [];
        for (const key in tasksGroup) {
          const execLabel = tasksGroup[key][0].input.gain.label2;
          const gain = tasksGroup[key][0].input.gain.label;

          taskFoodList.push({
            title: tasksGroup[key][0].input.label,
            describe: tasksGroup[key][0].description,
            type: tasksGroup[key][0].type,
            id: tasksGroup[key][0]._id,
            execLabel,
            gain,
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
    if (this.pageModel.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType2(
        this.pageModel.tasks
      );

      if (tasksGroupType['WORKOUTS']) {
        const tasksGroup = this.taskService.groupTaskByName2(
          tasksGroupType['WORKOUTS']
        );

        const taskFoodList = [];
        for (const key in tasksGroup) {
          const execLabel = tasksGroup[key][0].input.gain.label2;
          const gain = tasksGroup[key][0].input.gain.label;

          taskFoodList.push({
            title: tasksGroup[key][0].input.label,
            describe: tasksGroup[key][0].description,
            type: tasksGroup[key][0].type,
            id: tasksGroup[key][0]._id,
            execLabel,
            gain,
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
    if (this.pageModel.tasks) {
      const tasksGroupType = this.taskService.groupTaskByType2(
        this.pageModel.tasks
      );

      if (tasksGroupType['FOOD']) {
        const tasksGroup = this.taskService.groupTaskByName2(
          tasksGroupType['FOOD']
        );

        const taskFoodList = [];
        for (const key in tasksGroup) {
          const execLabel = tasksGroup[key][0].input.gain.label2;
          const gain = tasksGroup[key][0].input.gain.label;

          taskFoodList.push({
            title: tasksGroup[key][0].input.label,
            describe: tasksGroup[key][0].description,
            type: tasksGroup[key][0].type,
            id: tasksGroup[key][0]._id,
            execLabel,
            gain,
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

  withTask(task: ResponseGetAllTasks) {
    if (this.pageModel.benefit) {
      const taskFind = this.pageModel.benefit.plan.tasks.find(
        (t) => t.task._id === task._id
      );

      return !!taskFind;
    } else {
      return true;
    }
  }

  backPage() {
    this._location.back();
  }

  toggleTask(task: ResponseGetAllTasks) {
    if (this.pageModel.benefit?.email) {
      if (this.withTask(task)) {
        this.taskService
          .removeTaskInPlan(task._id, this.pageModel.benefit?.email)
          .subscribe({
            error: () => this.toast.showErrorSystem(),
            next: () => this.getBenefit(),
          });
      } else {
        this.dialog
          .open(DialogAddTasksComponent, {
            width: '315px',
            data: {
              benefit: this.pageModel.benefit,
              task,
            },
          })
          .afterClosed()
          .subscribe(() => this.getBenefit());
      }
    }
  }
}
