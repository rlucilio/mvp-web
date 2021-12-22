import { FindBenefitResponse } from '../../benefit/services/responses-benefit';

export interface ResponseFindProviderPlan {
  endDate: string;
  beginDate: string;
  tasks: ResponseFindProviderTaskElement[];
  _id: string;
}

export interface ResponseFindProviderTaskElement {
  task: ResponseFindProviderTaskTask;
  expected: number;
  result: number;
  status: string;
  dateExpected: string;
  updateDate: string;
}

export interface ResponseFindProviderTaskTask {
  _id: string;
  input: ResponseFindProviderInput;
  description: string;
  name: string;
  type: string;
  __v: number;
}

export interface ResponseFindProviderInput {
  type: ResponseFindProviderTypeClass;
  label: string;
  check: null;
  count: ResponseFindProviderCount;
  gain: ResponseFindProviderGain;
}

export interface ResponseFindProviderCount {
  min: number;
  max: number;
  default: number;
  multiplesLabel: string;
  uniqueLabel: string;
}

export interface ResponseFindProviderGain {
  label: string;
  label2: string;
}

export interface ResponseFindProviderTypeClass {
  type: string;
  label: string;
  check: null;
  count: ResponseFindProviderCount;
  gain: ResponseFindProviderGain;
}
export interface Question {
  question: string;
  answer: string[] | string;
}

export interface User {
  _id: string;
  updateDate: string;
  insertDate: string;
  state: string;
  name: string;
  email: string;
  __v: number;
  pass: string;
  gender: string;
  phone: string;
}

export interface ResponseFindProvider {
  name: string;
  specialty: string;
  bio: string;
  email: string;
  state: string;
  phone: string;
  gender: string;
  benefits: FindBenefitResponse[];
}

export interface ResponseFindProviderBody {
  weight: number;
  height: number;
}

export interface ResponseFindProviderQuestion {
  question: string;
  answer: string[] | string;
}

export interface ResponseFindProviderUser {
  _id: string;
  updateDate: string;
  insertDate: string;
  state: string;
  name: string;
  email: string;
  __v: number;
  pass: string;
  gender: string;
  phone: string;
}
