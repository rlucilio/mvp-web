import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private readonly toast: ToastService) {}

  ngOnInit(): void {}

  showInDevelopment() {
    this.toast.show('Em desenvolvimento');
  }
}
