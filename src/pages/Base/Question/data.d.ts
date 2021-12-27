export interface QuestionType {
  id: string;
  scaleId: string;
  name: string;
  code: string;
  answerGroupCode: string;
  type: string;
  order: Number;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}
