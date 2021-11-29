import { Component, OnInit } from '@angular/core';
import { ServerService } from './core/server/services/server.service';
import { UserAuthService } from './core/user-auth/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authService: UserAuthService,
    private readonly serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.serverService.verifyServer().subscribe(console.log);

    // this.authService.isFirstAccess('renannn@email.com').subscribe({
    //   complete: console.log,
    //   next: console.log,
    //   error: console.error,
    // });

    // this.authService.login('renannn@email.com', '1234').subscribe({
    //   complete: console.log,
    //   next: response => console.log(response),
    //   error: console.error,
    // });

    // this.authService.requestChangePass('renannn@email.com').subscribe({
    //   complete: console.log,
    //   next: response => console.log(response),
    //   error: console.error,
    // });
  }
}
