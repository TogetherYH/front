export interface AnswerType {
  id: string;
  name: string;
  groupCode: string;
  parentId: string;
  scaleId: string;
  option: string;
  score: Number;
  order: Number;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}
