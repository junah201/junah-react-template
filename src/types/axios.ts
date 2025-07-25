export type Query = object | undefined;
export type Params = Record<string, string | number>;
export interface DataForm {
  [key: string]: any;
}

export interface AccessToken {
  key: string;
  expires: number;
}
