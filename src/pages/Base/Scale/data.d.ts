export interface ScaleType {
  id?: string;
  name?: string;
  code?: string;
  parentId?: string;
  createTime?: string;
  status?: string;
  introduction?: string;
}

export interface FormValues {
  [name: string]: any;
}

export interface ScaleTreeType {
  id: string;
  name: string;
  path: string;
  parentId: string;
  children: ScaleTreeType[];
}
