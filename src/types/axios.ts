export type Query = object | undefined;
export type Params = Record<string, string | number>;
export type DataForm = Record<string, string | number | Blob | File>;

export interface AccessToken {
  key: string;
  expires: number;
}
