import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-tasks',
  template: `
    <main class="content">
      <header class="nav">
        <button class="nav__btn">
          <img src="../../../../../assets/icons/close.svg" />
        </button>
        <p class="nav__title">Atualização da tarefa</p>
      </header>

      <main class="main">
        <p class="main__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <ng-container *ngIf="false">
          <section class="inp__choose">
            <mat-radio-group
              class="choose__group"
              color="primary"
              labelPosition="before"
            >
              <mat-radio-button value="sim" class="choose__item"
                >Sim</mat-radio-button
              >
              <mat-radio-button value="não" class="choose__item"
                >Não</mat-radio-button
              >
            </mat-radio-group>
          </section>
        </ng-container>

        <ng-container *ngIf="true">
          <section class="inp__count">
            <mat-slider
              class="count"
              color="primary"
              thumbLabel
              [displayWith]="formatLabel"
              step="1"
              min="0"
              max="10"
              aria-label="units"
            ></mat-slider>
          </section>
        </ng-container>

        <section class="pred">
          <h3 class="pred__title">Periodicidade</h3>
          <section class="pred__select">
            <mat-select placeholder="Periodicidade">
              <mat-optgroup label="Mais de um dia na semana">
                <mat-option value="diario">Diário</mat-option>
                <mat-option value="segQuaSext"
                  >Toda segunda, quarta e sexta</mat-option
                >
                <mat-option value="terQua">Toda terça e quinta</mat-option>
                <mat-option value="fds">Final de semana</mat-option>
              </mat-optgroup>
              <mat-optgroup label="Uma vez na semana">
                <mat-option value="seg">Toda segunda</mat-option>
                <mat-option value="ter">Toda terça</mat-option>
                <mat-option value="qua">Toda quarta</mat-option>
                <mat-option value="qui">Toda quinta</mat-option>
                <mat-option value="sex">Toda sexta</mat-option>
                <mat-option value="sab">Toda sábado</mat-option>
                <mat-option value="dom">Toda domingo</mat-option>
              </mat-optgroup>
            </mat-select>
          </section>
        </section>
      </main>

      <footer>
        <app-btn>Guardar alteração</app-btn>
      </footer>
    </main>
  `,
  styles: [
    `
      .nav {
        display: flex;
        margin-bottom: 30px;

        &__btn {
          background: transparent;
          outline: none;
          border: none;
        }

        &__title {
          margin: 0;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
          flex: 1;
          margin-left: 15px;
        }
      }

      .main {
        margin-bottom: 20px;
      }

      .pred {
        &__title {
          font-family: Poppins;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          color: #1d1617;
        }

        &__select {
          background: #f7f8f8;
          border-radius: 14px;
          padding: 15px;
        }
      }

      .choose {
        &__group {
          display: flex;
          flex-direction: column;
        }

        &__item {
          margin-bottom: 20px;
          ::ng-deep .mat-radio-label {
            justify-content: space-between;
          }
        }
      }

      .count {
        width: 100%;
        margin-top: 15px;
      }

      app-btn {
        ::ng-deep button {
          margin-bottom: 12px;
        }
      }
    `,
  ],
})
export class DialogAddTasksComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<DialogAddTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  formatLabel(value: number) {
    return value;
  }
}
