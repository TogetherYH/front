export interface SingleUserType {
  id: number;
  username: string;
  realName: string;
  sex: string;
  birthday: string;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}
