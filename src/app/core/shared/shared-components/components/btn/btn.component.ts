import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  @Input() disabled?: boolean;
  @Input() icon?: string;
  @Input() color?: 'SECONDARY_FLAT' | 'FOCUS' | 'SECONDARY' | 'PRIMARY' =
    'PRIMARY';

  constructor() {}

  ngOnInit(): void {}
}
