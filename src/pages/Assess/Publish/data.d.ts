export interface PublishType {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  createTime: string;
  status: string;
  scales: any[];
}

export interface FormValues {
  [name: string]: any;
}
