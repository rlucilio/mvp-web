import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss'],
})
export class RegisterSuccessComponent {
  constructor(private readonly router: Router) {}

  goToHome() {
    //TODO: Add navegação
    this.router.navigate([]);
  }
}
