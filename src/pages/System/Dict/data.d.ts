export interface DictType {
  id: string;
  name: string;
  code: string;
  createTime: string;
  status: string;
}

export interface DictItemType {
  id: string;
  code: string;
  label: string;
  value: string;
  order: number;
}

export interface FormValues {
  [name: string]: any;
}
