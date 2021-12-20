import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { DialogFeedbackComponent } from '../dialog-feedback/dialog-feedback.component';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-task-home-benefit',
  templateUrl: './task-home-benefit.component.html',
  styleUrls: ['./task-home-benefit.component.scss'],
})
export class TaskHomeBenefitComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') ctxCanvas?: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.ctxCanvas?.nativeElement) {
      Chart.register(...registerables);

      this.chart = new Chart(this.ctxCanvas?.nativeElement, {
        type: 'bar',
        data: {
          labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
          datasets: [
            {
              data: [100, 19, 3, 19, 2, 50, 3],
              backgroundColor: (ctx) => {
                if ((ctx.raw as number) > 50) {
                  return this.createCompleteColor();
                } else {
                  return this.createWaitColor();
                }
              },
              borderWidth: 0,
              borderRadius: Number.MAX_SAFE_INTEGER,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              display: false,
              max: 100,
              min: 0,
            },
            x: {
              grid: {
                display: false,
                lineWidth: 0,
              },
            },
          },
        },
      });
    }
  }

  private createCompleteColor() {
    const successColor = (this.ctxCanvas?.nativeElement as HTMLCanvasElement)
      ?.getContext('2d')
      ?.createLinearGradient(600, 100, 0, 100);

    successColor?.addColorStop(0, 'rgba(198, 103, 32, 1)');
    successColor?.addColorStop(1, 'rgba(240, 165, 8, 1)');

    return successColor;
  }

  private createWaitColor() {
    const successColor = (this.ctxCanvas?.nativeElement as HTMLCanvasElement)
      ?.getContext('2d')
      ?.createLinearGradient(600, 100, 0, 100);

    successColor?.addColorStop(0, '#C58BF2');
    successColor?.addColorStop(1, '#EEA4CE');
    return successColor;
  }

  openDialogMarkDone() {
    this.dialog.open(DialogTaskComponent, {
      width: '315px',
      data: {},
    });
  }
}
