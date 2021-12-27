export interface FactorType {
  id: string;
  name: string;
  scaleId: string;
  average: Number;
  sd: Number;
  order: Number;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}
