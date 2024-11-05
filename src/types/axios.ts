import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type AxiosInterceptorReqConfig = InternalAxiosRequestConfig;
export type AuthReqConfig = any;
export type ReqRejected = any;

export type AxiosInterceptorRes = AxiosResponse<any, any>;
export type AxiosRes =
  | AxiosResponse<any, any>
  | Promise<AxiosResponse<any, any>>
  | any;

export type Query = object | undefined;
export type Params = {
  [key: string]: string | number;
};
export interface DataForm {
  [key: string]: any;
}

interface FastAPI400Error {
  detail: string;
}

interface FastAPI422Error {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export type AxiosErr = AxiosError<
  FastAPI400Error | FastAPI422Error | undefined
>;

export interface AccessToken {
  key: string;
  expires: number;
}
