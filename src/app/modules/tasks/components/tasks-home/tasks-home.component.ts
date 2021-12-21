import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tasks-home',
  templateUrl: './tasks-home.component.html',
  styleUrls: ['./tasks-home.component.scss'],
})
export class TasksHomeComponent implements OnInit {
  constructor(private readonly _location: Location) {}

  @Input() title?: string = 'Minhas atividades';
  @Input() headerColor?: string =
    'linear-gradient(270deg, #c58bf2 0%, #eea4ce 100%)';

  ngOnInit(): void {}

  backPage() {
    this._location.back();
  }
}
