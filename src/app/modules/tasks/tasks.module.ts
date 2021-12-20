import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './components/root/tasks.component';
import { TasksHomeComponent } from './components/tasks-home/tasks-home.component';
import { TaskHomeBenefitComponent } from './components/task-home-benefit/task-home-benefit.component';
import { DialogTaskComponent } from './components/dialog-task/dialog-task.component';
import { SharedComponentsModule } from 'src/app/core/shared/shared-components/shared-components.module';
import { DialogFeedbackComponent } from './components/dialog-feedback/dialog-feedback.component';
import { TaskHomeProviderComponent } from './components/task-home-provider/task-home-provider.component';
import { TasksBenefitComponent } from './components/tasks-benefit/tasks-benefit.component';
import { DialogAddTasksComponent } from './components/dialog-add-tasks/dialog-add-tasks.component';
import { DialogRemoveTaskComponent } from './components/dialog-remove-task/dialog-remove-task.component';
import { StartPlanComponent } from './components/start-plan/start-plan.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TasksComponent,
    TasksHomeComponent,
    TaskHomeBenefitComponent,
    DialogTaskComponent,
    DialogFeedbackComponent,
    TaskHomeProviderComponent,
    TasksBenefitComponent,
    DialogAddTasksComponent,
    DialogRemoveTaskComponent,
    StartPlanComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatProgressBarModule,
    SharedComponentsModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class TasksModule {}
