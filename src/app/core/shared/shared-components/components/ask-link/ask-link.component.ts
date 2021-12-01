import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ask-link',
  templateUrl: './ask-link.component.html',
  styleUrls: ['./ask-link.component.scss'],
})
export class AskLinkComponent {
  @Input() orValue?: string;
  @Input() message?: string;
  @Input() link?: string;
  @Output() onClickLink = new EventEmitter();

  constructor() {}

  emitLink() {
    this.onClickLink.emit();
  }
}
