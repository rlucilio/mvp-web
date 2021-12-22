import { TaskElement } from 'src/app/core/benefit/services/responses-benefit';

export interface TaskPageModel {
  title: string;
  gain: string;
  type: string;
  id: string;
  execLabel: string;
  percent: number;
  task: TaskElement;
}
