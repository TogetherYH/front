export interface SingleDeptType {
  id: string;
  name: string;
  code: string;
  parentId: string;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}
