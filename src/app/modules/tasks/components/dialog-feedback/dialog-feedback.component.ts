import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BenefitService } from 'src/app/core/benefit/services/benefit.service';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';

@Component({
  selector: 'app-dialog-feedback',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn" (click)="close()">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Como você se sente em relação aos treinos?</p>
      </header>

      <main class="main">
        <section class="inp__choose">
          <mat-radio-group
            class="choose__group"
            color="primary"
            labelPosition="before"
            [(ngModel)]="result"
          >
            <div class="choose__container">
              <img
                src="../../../../../assets/imgs/nps1.svg"
                class="choose__icon"
              />
              <mat-radio-button [value]="1" class="choose__item"
                >Com preguiça</mat-radio-button
              >
            </div>

            <div class="choose__container">
              <img
                src="../../../../../assets/imgs/nps2.svg"
                class="choose__icon"
              />
              <mat-radio-button [value]="2" class="choose__item"
                >Enfiei o pé na jaca</mat-radio-button
              >
            </div>

            <div class="choose__container">
              <img
                src="../../../../../assets/imgs/nps3.svg"
                class="choose__icon"
              />
              <mat-radio-button [value]="3" class="choose__item"
                >Normal</mat-radio-button
              >
            </div>

            <div class="choose__container">
              <img
                src="../../../../../assets/imgs/nps4.svg"
                class="choose__icon"
              />
              <mat-radio-button [value]="4" class="choose__item"
                >On fire</mat-radio-button
              >
            </div>
          </mat-radio-group>
        </section>
      </main>

      <footer>
        <app-btn (click)="sendFeedBack()">Concluir</app-btn>
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

      .choose {
        &__group {
          display: flex;
          flex-direction: column;
        }

        &__item {
          width: 100%;
          ::ng-deep .mat-radio-label {
            justify-content: space-between;
          }
        }

        &__container {
          width: 100%;
          display: flex;
          margin-bottom: 15px;
        }

        &__icon {
          margin-right: 10px;
        }
      }

      app-btn {
        ::ng-deep button {
          margin-bottom: 12px;
        }
      }
    `,
  ],
})
export class DialogFeedbackComponent implements OnInit {
  result?: number;
  constructor(
    private readonly dialogRef: MatDialogRef<DialogFeedbackComponent>,
    private readonly storage: StorageService,
    private readonly toast: ToastService,
    private readonly benefit: BenefitService
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  sendFeedBack() {
    const userStorage = this.storage.get(KEY_USER);
    if (userStorage && this.result) {
      const user = JSON.parse(userStorage) as { email: string };
      this.benefit.sendFeedBack(user.email, this.result).subscribe({
        error: () => this.toast.showErrorSystem(),
        next: () => this.dialogRef.close(),
      });
    }
  }
}
