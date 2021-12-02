import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/core/shared/services/services/toast.service';
import { ServerService } from '../../core/server/services/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly serverService: ServerService) {}

  ngOnInit(): void {
    this.verifyServer();
  }

  private verifyServer() {
    this.serverService.verifyServer().subscribe(console.log);
  }
}
