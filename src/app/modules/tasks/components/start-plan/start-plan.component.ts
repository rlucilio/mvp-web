import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-start-plan',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Agendar consulta</p>
      </header>

      <main class="main">
        <p class="main__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <section class="datepick" (click)="picker.open()">
          <p class="datepick__title">Escolha a duração do plano</p>
          <section class="datepick__container">
            <mat-date-range-input [rangePicker]="picker">
              <input matStartDate placeholder="Começo" readonly />
              <input matEndDate placeholder="Fim" readonly />
            </mat-date-range-input>
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-date-range-picker #picker></mat-date-range-picker>
          </section>
        </section>
      </main>

      <footer class="footer">
        <app-btn [color]="'PRIMARY'" (click)="close()">Iniciar plano</app-btn>
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
          text-align: center;
          flex: 1;
        }
      }

      .main {
        margin-bottom: 60px;

        &__text {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 21px;
          color: #1d1617;
          margin: 0;
          margin-bottom: 12px;

          &--sub {
            font-family: Poppins;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            color: #7b6f72;
          }
        }

        &__info {
          display: flex;
          align-items: center;
        }

        &__img {
          margin-right: 12px;
        }
      }

      .datepick {
        margin-top: 20px;

        &__title {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
        }

        &__container {
          display: flex;
          align-items: center;
          background: #f7f8f8;
          border-radius: 14px;
          padding: 10px;
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
export class StartPlanComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<StartPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
