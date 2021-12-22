import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @Input() isProvider = false;
  constructor(
    private readonly toast: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  goToSchedule() {
    if (this.isProvider) {
      this.toast.show('Em desenvolvimento');
    } else {
      this.router.navigateByUrl('/home/schedule');
    }
  }

  goToTask() {
    if (this.isProvider) {
      this.router.navigate(['/home/tasks/provider']);
    } else {
      this.router.navigate(['/home/tasks/benefit']);
    }
  }

  goToDash() {
    this.toast.show('Em desenvolvimento');
  }
}
