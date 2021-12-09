import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import {
  ResponseSchedule,
  ScheduleService,
} from '../../services/schedule.service';

@Component({
  selector: 'app-dialog',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn" (click)="close()">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Agendar consulta</p>
      </header>

      <main class="main">
        <p class="main__text">
          {{ data.provider.specialty === 'Médica(o)' ? 'Dr(a). ' : ''
          }}{{ data.provider.name }}
        </p>
        <div class="main__info">
          <img class="main__img" src="../../../../../assets/icons/watch.svg" />
          <span class="main__text-sub">{{ getDate() }}</span>
        </div>
      </main>

      <footer>
        <app-btn [color]="'SECONDARY'" (click)="close()">Cancelar</app-btn>
        <app-btn (click)="scheduling()">Agendar consulta</app-btn>
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
  constructor(
    private readonly dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResponseSchedule,
    private readonly scheduleService: ScheduleService,
    private readonly storage: StorageService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }

  scheduling() {
    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) {
      this.router.navigate(['/auth/login']);
      this.close();
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.scheduleService.createSchedule(this.data, user.email).subscribe({
      error: () => this.toast.showErrorSystem(),
      next: () => {
        this.toast.show('Agendamento criado 👍🏻');
        this.router.navigate(['/schedule/marked']);
        this.close();
      },
    });
  }

  getDate() {
    return moment(this.data.dateTime, 'DD/MM/YYYY HH:mm').format(
      'DD/MM/YYYY | hh:mm'
    );
  }
}
