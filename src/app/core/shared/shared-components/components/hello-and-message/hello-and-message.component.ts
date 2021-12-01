import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello-and-message',
  templateUrl: './hello-and-message.component.html',
  styleUrls: ['./hello-and-message.component.scss'],
})
export class HelloAndMessageComponent implements OnInit {
  @Input() helloMessage?: string;
  @Input() message?: string;

  constructor() {}

  ngOnInit(): void {}
}
