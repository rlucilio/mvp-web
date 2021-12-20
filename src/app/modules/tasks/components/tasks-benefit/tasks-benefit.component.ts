import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTasksComponent } from '../dialog-add-tasks/dialog-add-tasks.component';
import { DialogRemoveTaskComponent } from '../dialog-remove-task/dialog-remove-task.component';
import { StartPlanComponent } from '../start-plan/start-plan.component';

@Component({
  selector: 'app-tasks-benefit',
  templateUrl: './tasks-benefit.component.html',
  styleUrls: ['./tasks-benefit.component.scss'],
})
export class TasksBenefitComponent implements OnInit {
  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.create();
  }

  create() {
    this.dialog.open(StartPlanComponent, {
      width: '315px',
      data: {},
    });
  }
}
