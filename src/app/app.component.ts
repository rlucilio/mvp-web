import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './auth/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: UserAuthService) {}

  ngOnInit(): void {
    this.authService.isFirstAccess('renannn@email.com').subscribe({
      complete: console.log,
      next: console.log,
      error: console.error,
    });

    this.authService.login('renannn@email.com', '1234').subscribe({
      complete: console.log,
      next: response => console.log(response),
      error: console.error,
    });
  }
}
