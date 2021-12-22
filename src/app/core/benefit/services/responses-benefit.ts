// Generated by https://quicktype.io

export interface FindBenefitResponse {
  _id: string;
  updateDate: string;
  insertDate: string;
  user: string;
  __v: number;
  body: Body[];
  birthDate: string;
  questions: Question[];
  answeredForm: boolean;
  plan: Plan;
  state: string;
  name: string;
  email: string;
  pass: string;
  gender: string;
  phone: string;
}

export interface Body {
  weight: number;
  height: number;
}

export interface Plan {
  endDate: string;
  beginDate: string;
  tasks: TaskElement[];
  _id: string;
}

export interface TaskElement {
  task: TaskTask;
  expected: number;
  result: number;
  status: string;
  dateExpected: string;
  updateDate: string;
}

export interface TaskTask {
  _id: string;
  input: Input;
  description: string;
  name: string;
  type: TaskType;
  __v: number;
}

export interface Input {
  type: TypeClass;
  label: string;
  check: Check;
  count: Count;
  gain: Gain;
}

export interface Check {
  trueLabel: string;
  falseLabel: string;
}

export interface Count {
  min: number;
  max: number;
  default: number;
  multiplesLabel: string;
  uniqueLabel: string;
}

export interface Gain {
  label: string;
  label2: string;
}

export interface TypeClass {
  type: string;
  label: string;
  check: null;
  count: Count;
  gain: Gain;
}

export interface Question {
  question: string;
  answer: string[] | string;
}