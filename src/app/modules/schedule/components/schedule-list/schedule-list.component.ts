import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { Location } from '@angular/common';
import {
  ResponseSchedule,
  ScheduleService,
} from '../../services/schedule.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  schedules?: {
    name: string;
    specialty: string;
    dayExtension: string;
    date: string;
    hour: string;
    src: ResponseSchedule;
  }[];
  constructor(
    private readonly dialog: MatDialog,
    private readonly scheduleService: ScheduleService,
    private readonly toast: ToastService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly _location: Location
  ) {}

  ngOnInit(): void {
    if (
      this.route.snapshot.queryParamMap.has('specialty') &&
      this.route.snapshot.queryParamMap.has('first')
    ) {
      this.scheduleService
        .getSchedules(
          this.route.snapshot.queryParamMap.get('specialty') || 'ALL'
        )
        .subscribe({
          error: () => {
            if (this.route.snapshot.queryParamMap.get('first')) {
              this.router.navigate(['/home/first-access']);
            } else {
              this._location.back();
            }
            this.toast.showErrorSystem();
          },
          next: (response) =>
            (this.schedules = response.map((schedule) => ({
              name: `${schedule.provider.name.slice(0, 15)}.`,
              specialty: this.getSpecialty(schedule.provider.specialty),
              dayExtension: this.getWeekDay(
                moment(schedule.dateTime).isoWeekday()
              ),
              date: moment(schedule.dateTime).format('DD/MM/YY'),
              hour: moment(schedule.dateTime).format('hh:mm'),
              src: schedule,
            }))),
        });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  scheduling(schedule: ResponseSchedule) {
    this.dialog.open(DialogComponent, {
      width: '315px',
      data: schedule,
    });
  }

  private getSpecialty(specialty: string) {
    switch (specialty) {
      case 'DOCTOR':
        return 'Médico(a)';
      case 'NURSE':
        return 'Enfermeiro(a)';
      case 'NUTRITIONIST':
        return 'Nutricionista';
      case 'DOCTOR':
        return 'Educador físico';
      default:
        return 'Especialidade';
    }
  }

  private getWeekDay(day: number) {
    switch (day) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Segunda';
      case 2:
        return 'Terça';
      case 3:
        return 'Quarta';
      case 4:
        return 'Quinta';
      case 5:
        return 'Sexta';
      case 7:
        return 'Sábado';

      default:
        return 'Dia';
    }
  }

  backPage() {
    this._location.back();
  }
}