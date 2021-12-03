import { Component, OnInit } from '@angular/core';
import { REGEX_MOBILE } from 'src/app/core/shared/constants';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { ServerService } from '../../core/server/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMobile = true;
  constructor(
    private readonly serverService: ServerService,
    private readonly toast: ToastService
  ) {}

  ngOnInit(): void {
    this.verifyServer();
    this.isMobile = REGEX_MOBILE.test(navigator.userAgent);
  }

  private verifyServer() {
    this.serverService.verifyServer().subscribe({
      next: () => console.log('Servidor pronto'),
      error: () => this.toast.showErrorSystem(),
    });
  }
}
