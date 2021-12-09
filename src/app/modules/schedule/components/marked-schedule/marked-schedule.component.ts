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
    private readonly toast: ToastService
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
          .filter((res) => res.provider.specialty === 'NURSE')
          .filter((res) => res.schedule.status === 'FINALIZADO').length;

        this.nurseSchedule = this.verifyAttendance(response, 'NURSE');
        this.nutriSchedule = this.verifyAttendance(response, 'NUTRITIONIST');
        this.doctorSchedule = this.verifyAttendance(response, 'DOCTOR');
        this.educatorSchedule = this.verifyAttendance(
          response,
          'PHYSICAL_EDUCATOR'
        );
      },
    });
  }

  private verifyAttendance(response: Response[], specialty: string) {
    const schedulesNurses = response.filter(
      (res) => res.provider.specialty === specialty
    );

    const scheduleNurse = schedulesNurses.filter(
      (res) => res.schedule.status !== 'CRIADO'
    )[0];

    if (scheduleNurse) {
      return {
        dateTime: moment(scheduleNurse.schedule.dateTime).format(
          'DD/MM, hh:mm'
        ),
        link: scheduleNurse.schedule.room,
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
}
