import { TasksResponse } from 'src/app/core/benefit/services/benefit.service';

export interface TaskPageModel {
  title: string;
  gain: string;
  type: string;
  id: string;
  execLabel: string;
  percent: number;
  task: TasksResponse;
}
