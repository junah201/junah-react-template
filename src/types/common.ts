export interface Datas<TData> {
  data: TData[];
  count: number;
}

export interface TableBase {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface Message<T = string> {
  message: T;
}
