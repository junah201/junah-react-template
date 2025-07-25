export interface Response<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface Pagination<T = any> {
  page: number;
  size: number;
  total: number;
  nodes: T[];
}
