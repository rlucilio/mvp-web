import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { KEY_USER } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { StorageService } from 'src/app/core/storage/services/storage.service';
import { ScheduleService } from '../../services/schedule.service';

type Response = {
  schedule: {
    _id: string;
    status: string;
    room: string;
    updateDate: string;
    insertDate: string;
    dateTime: string;
    provider: string;
    cod: string;
    __v: number;
    benefit: string;
  };
  provider: {
    _id: string;
    updateDate: string;
    insertDate: string;
    specialty: string;
    user: string;
    __v: number;
    bio: string;
  };
};

@Component({
  selector: 'app-marked-schedule',
  templateUrl: './marked-schedule.component.html',
  styleUrls: ['./marked-schedule.component.scss'],
})
export class MarkedScheduleComponent implements OnInit {
  passedWithCoach = false;
  nurseSchedule?: {
    link: string;
    dateTime: string;
  };

  doctorSchedule?: {
    link: string;
    dateTime: string;
  };

  nutriSchedule?: {
    link: string;
    dateTime: string;
  };

  educatorSchedule?: {
    link: string;
    dateTime: string;
  };

  constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly schedule: ScheduleService,
    private readonly toast: ToastService,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    const userStorage = this.storage.get(KEY_USER) || '';

    if (!userStorage) {
      this.router.navigate(['/auth']);
    }

    const user: { email: string } = JSON.parse(userStorage);
    this.schedule.getScheduleByBenefit(user.email).subscribe({
      error: (error: HttpErrorResponse) => {
        this.toast.showErrorSystem();
      },
      next: (response) => {
        this.passedWithCoach = !!response
          .filter((res) => res.provider.specialty === 'Enfermeira(o)')
          .filter((res) => res.schedule.status === 'FINALIZADO').length;

        this.nurseSchedule = this.verifyAttendance(response, 'Enfermeira(o)');
        this.nutriSchedule = this.verifyAttendance(response, 'Nutricionista');
        this.doctorSchedule = this.verifyAttendance(response, 'Médica(o)');
        this.educatorSchedule = this.verifyAttendance(
          response,
          'Educador físico'
        );
      },
    });
  }

  private verifyAttendance(response: Response[], specialty: string) {
    const schedulesNurse = response.filter(
      (res) => res.provider.specialty === specialty
    )[0];

    if (schedulesNurse) {
      return {
        dateTime: moment(
          schedulesNurse.schedule.dateTime,
          'DD/MM/YYYY HH:mm'
        ).format('DD/MM, hh:mm'),
        link: schedulesNurse.schedule.room,
      };
    } else {
      return undefined;
    }
  }

  goToSchedule(route: string) {
    this.router.navigateByUrl(route);
  }

  openRoom(url?: { link: string; dateTime: string }) {
    if (url) {
      document.location.href = url.link;
    }
  }

  backPage() {
    this._location.back();
  }
}
