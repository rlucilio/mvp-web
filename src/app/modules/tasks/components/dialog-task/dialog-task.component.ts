import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { TaskPageModel } from 'src/app/modules/home/components/home-benefit/task-page-model';
import { TaskService } from '../../services/task.service';
import { DialogFeedbackComponent } from '../dialog-feedback/dialog-feedback.component';

@Component({
  selector: 'app-dialog-task',
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
          {{ data.task.task.input.label }}
        </p>

        <ng-container *ngIf="data.task.task.input.type.type === 'CHECK'">
          <section class="inp__choose">
            <mat-radio-group
              class="choose__group"
              color="primary"
              labelPosition="before"
              [(ngModel)]="result"
            >
              <mat-radio-button [value]="true" class="choose__item">{{
                data.task.task.input.check?.trueLabel
              }}</mat-radio-button>
              <mat-radio-button [value]="false" class="choose__item">{{
                data.task.task.input.check?.falseLabel
              }}</mat-radio-button>
            </mat-radio-group>
          </section>
        </ng-container>

        <ng-container *ngIf="data.task.task.input.type.type === 'COUNT'">
          <section class="inp__count">
            <mat-slider
              *ngIf="data.task.expected"
              class="count"
              color="primary"
              thumbLabel
              [displayWith]="formatLabel"
              step="1"
              [min]="data.task.task.input.count.min"
              [max]="data.task.expected.toString() | number"
              [(ngModel)]="result"
            ></mat-slider>
          </section>
        </ng-container>
      </main>

      <footer>
        <app-btn (click)="markDone()">Concluir</app-btn>
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
          text-align: center;
          color: #1d1617;
          flex: 1;
        }
      }

      .main {
        margin-bottom: 20px;

        &__text {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
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
export class DialogTaskComponent implements OnInit {
  result?: boolean | number;
  constructor(
    private readonly dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskPageModel,
    private readonly taskService: TaskService,
    private readonly storage: StorageService,
    private readonly toast: ToastService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  markDone() {
    const userStorage = this.storage.get(KEY_USER);
    if (userStorage && this.result) {
      const user = JSON.parse(userStorage) as { email: string };
      this.taskService
        .markTask(user.email, this.data.id, this.result)
        .subscribe({
          error: () => this.toast.showErrorSystem(),
          next: (res) => {
            if (res.needFeedBack) {
              this.dialogRef.close();
              this.dialog.open(DialogFeedbackComponent, {
                width: '315px',
              });
            } else {
              this.dialogRef.close();
            }
          },
        });
    }
  }

  formatLabel = (value: number) => {
    return `${value}x`;
  };
}
