export interface PublishType {
  id: string;
  subject: string;
  startDate: string;
  endDate: string;
  createTime: string;
  mobileView: string;
  status: string;
  scales: any[];
  depts: any[];
}

export interface FormValues {
  [name: string]: any;
}
