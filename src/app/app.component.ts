import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './auth/services/user-auth.service';
import { StorageService } from './storage/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: UserAuthService, private readonly storageService: StorageService) {}

  ngOnInit(): void {
    this.storageService.set('renan', 'lucilio');
    this.storageService.get('renan').subscribe(console.log, console.log)

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
