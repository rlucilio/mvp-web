import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Agendar consulta</p>
      </header>

      <main class="main">
        <p class="main__text">Dr. Abigail Richter</p>
        <div class="main__info">
          <img class="main__img" src="../../../../../assets/icons/watch.svg" />
          <span class="main__text-sub">11 Dez | 09:00AM</span>
        </div>
      </main>

      <footer>
        <app-btn [outline]="true">Cancelar</app-btn>
        <app-btn>Agendar consulta</app-btn>
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
          font-weight: 500;
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

      app-btn {
        ::ng-deep button {
          margin-bottom: 12px;
        }
      }
    `,
  ],
})
export class DialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
