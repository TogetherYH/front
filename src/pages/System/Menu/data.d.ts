export interface MenuType {
  id: string;
  name: string;
  code: string;
  type: string;
  path: string;
  parentId: string;
  createTime: string;
  status: string;
}

export interface FormValues {
  [name: string]: any;
}

export interface MenuTreeType {
  id: string;
  name: string;
  path: string;
  parentId: string;
  children: MenuTreeType[];
}
