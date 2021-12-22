import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FindBenefitResponse } from 'src/app/core/benefit/services/responses-benefit';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { ResponseGetAllTasks, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dialog-add-tasks',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn" (click)="close()">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Atualização da tarefa</p>
      </header>

      <main class="main">
        <p class="main__text">
          {{ data.task.input.label }}
        </p>

        <ng-container *ngIf="data.task.input.type.type === 'CHECK'">
          <p class="main__text">Qual valor é esperado:</p>
          <section class="inp__choose">
            <mat-radio-group
              class="choose__group"
              color="primary"
              labelPosition="before"
              [(ngModel)]="expected"
            >
              <mat-radio-button value="sim" class="choose__item">{{
                data.task.input.type.check?.trueLabel
              }}</mat-radio-button>
              <mat-radio-button value="não" class="choose__item">{{
                data.task.input.type.check?.falseLabel
              }}</mat-radio-button>
            </mat-radio-group>
          </section>
        </ng-container>

        <ng-container *ngIf="data.task.input.type.type === 'COUNT'">
          <p class="main__text">Quantidade:</p>
          <section class="inp__count">
            <mat-slider
              [(ngModel)]="expected"
              class="count"
              color="primary"
              thumbLabel
              [displayWith]="formatLabel"
              step="1"
              [min]="data.task.input.type.count?.min"
              [max]="data.task.input.type.count?.max"
              aria-label="units"
            ></mat-slider>
          </section>
        </ng-container>

        <section class="pred">
          <h3 class="pred__title">Periodicidade</h3>
          <section class="pred__select">
            <mat-select [(ngModel)]="predSelected" placeholder="Periodicidade">
              <mat-optgroup label="Mais de um dia na semana">
                <mat-option value="all">Diário</mat-option>
                <mat-option value="sqs"
                  >Toda segunda, quarta e sexta</mat-option
                >
                <mat-option value="tq">Toda terça e quinta</mat-option>
                <mat-option value="fds">Final de semana</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Uma vez na semana">
                <mat-option value="seg">Toda segunda</mat-option>
                <mat-option value="ter">Toda terça</mat-option>
                <mat-option value="qua">Toda quarta</mat-option>
                <mat-option value="qui">Toda quinta</mat-option>
                <mat-option value="sex">Toda sexta</mat-option>
                <mat-option value="sab">Toda sábado</mat-option>
                <mat-option value="dom">Toda domingo</mat-option>
              </mat-optgroup>
            </mat-select>
          </section>
        </section>
      </main>

      <footer>
        <app-btn (click)="addTask()">Guardar alteração</app-btn>
      </footer>
    </main>
  `,
  styles: [
    `
      .nav {
        display: flex;
        margin-bottom: 30px;

        &__btn {
          background: transparent;
          outline: none;
          border: none;
        }

        &__title {
          margin: 0;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
          flex: 1;
          margin-left: 15px;
        }
      }

      .main {
        margin-bottom: 20px;
      }

      .pred {
        &__title {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
        }

        &__select {
          background: #f7f8f8;
          border-radius: 14px;
          padding: 15px;
        }
      }

      .choose {
        &__group {
          display: flex;
          flex-direction: column;
        }

        &__item {
          margin-bottom: 20px;
          ::ng-deep .mat-radio-label {
            justify-content: space-between;
          }
        }
      }

      .count {
        width: 100%;
        margin-top: 15px;
      }

      app-btn {
        ::ng-deep button {
          margin-bottom: 12px;
        }
      }
    `,
  ],
})
export class DialogAddTasksComponent implements OnInit {
  predSelected:
    | 'all'
    | 'sqs'
    | 'tq'
    | 'fds'
    | 'seg'
    | 'ter'
    | 'qua'
    | 'qui'
    | 'sex'
    | 'sab'
    | 'dom' = 'all';

  expected?: boolean | number;
  constructor(
    private readonly dialogRef: MatDialogRef<DialogAddTasksComponent>,
    private readonly taskService: TaskService,
    private readonly toastService: ToastService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      benefit: FindBenefitResponse;
      task: ResponseGetAllTasks;
    }
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  formatLabel = (value: number) => {
    return `${value}x`;
  };

  addTask() {
    if (this.predSelected && this.expected !== undefined) {
      let dates: string[];

      switch (this.predSelected) {
        case 'all':
          dates = this.getAllDates(() => true);
          break;
        case 'sqs':
          dates = this.getAllDates((day) => [1, 3, 5].includes(day));
          break;
        case 'tq':
          dates = this.getAllDates((day) => [2, 4].includes(day));
          break;
        case 'fds':
          dates = this.getAllDates((day) => [0, 6].includes(day));
          break;
        case 'dom':
          dates = this.getAllDates((day) => day === 0);
          break;
        case 'seg':
          dates = this.getAllDates((day) => day === 1);
          break;
        case 'ter':
          dates = this.getAllDates((day) => day === 2);
          break;
        case 'qua':
          dates = this.getAllDates((day) => day === 3);
          break;
        case 'qui':
          dates = this.getAllDates((day) => day === 4);
          break;
        case 'sex':
          dates = this.getAllDates((day) => day === 5);
          break;
        case 'sab':
          dates = this.getAllDates((day) => day === 6);
          break;
      }

      const body = dates.map((date) => ({
        task: this.data.task._id,
        email: this.data.benefit.email,
        expected: this.expected || 0,
        date,
      }));

      this.taskService.addTask(body).subscribe({
        error: () => this.toastService.showErrorSystem(),
        next: () => this.close(),
      });
    }
  }

  getAllDates(fnVerifyDay: (dayWeek: number) => boolean) {
    const now = moment(new Date());
    const lastDate = moment(this.data.benefit.plan.endDate, 'DD/MM/YYYY');
    const dates = [];
    while (now.isBefore(lastDate)) {
      if (fnVerifyDay(now.isoWeekday())) {
        dates.push(now.format('DD/MM/YYYY'));
        now.add(1, 'days');
      }
    }

    return dates;
  }
}
