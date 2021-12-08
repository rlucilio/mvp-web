import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss'],
})
export class ScheduleListComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.dialog.open(DialogComponent, {
      width: '315px',
    });
  }
}
