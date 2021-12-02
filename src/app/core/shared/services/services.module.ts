import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './services/toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  providers: [ToastService],
  imports: [CommonModule, MatSnackBarModule],
})
export class ServicesModule {}
