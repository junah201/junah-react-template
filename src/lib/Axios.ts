import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

import { Params, DataForm, AccessToken } from "@/types/axios";
import { Response } from "@/types/common";

export class Axios {
  private instance;
  private auth;
  private cookie;
  private accessToken;

  constructor(isAuthReq = false, baseURL = "", accessToken: AccessToken) {
    this.instance = axios.create({
      baseURL: `${baseURL}`,
    });
    this.auth = isAuthReq;
    this.cookie = new Cookies();
    this.setInterceptor();
    this.accessToken = accessToken;
  }

  /* Interceptor */
  private setInterceptor() {
    this.instance.interceptors.request.use(
      this.reqMiddleWare.bind(this),
      this.reqOnError.bind(this)
    );
    this.instance.interceptors.response.use(
      this.resMiddleWare.bind(this),
      this.resOnError.bind(this)
    );
  }

  /* Req */
  private reqMiddleWare(config: InternalAxiosRequestConfig) {
    let newConfig = config;
    if (this.auth) newConfig = this.setAuthReq(newConfig);

    return newConfig;
  }

  setAuthReq(config: InternalAxiosRequestConfig) {
    const { headers } = config;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${this.cookie.get(this.accessToken.key)}`,
      },
    };

    return newConfig as InternalAxiosRequestConfig;
  }

  reqOnError(error: any) {
    return Promise.reject(error);
  }

  /* Res */
  resMiddleWare(res: AxiosResponse<Response>) {
    const { authorization } = res.headers;

    if (authorization) {
      this.cookie.set(this.accessToken.key, authorization, {
        path: "/",
      });
    }

    return res;
  }

  resOnError(error: any) {
    return Promise.reject(error);
  }

  get<DataT = any>(endPoint: string) {
    return this.instance<Response<DataT>>({
      method: "GET",
      url: endPoint,
    });
  }

  getByParams<DataT = any>(endPoint: string, params: Params) {
    return this.instance<Response<DataT>>({
      method: "GET",
      url: `${endPoint}`,
      params: params,
    });
  }

  getByParamsAsBlob(endPoint: string, params: Params) {
    return this.instance({
      method: "GET",
      url: `${endPoint}`,
      params: params,
      responseType: "blob",
    });
  }

  post<DataT = any>(endPoint: string, data: DataForm) {
    return this.instance<Response<DataT>>({
      method: "POST",
      url: `${endPoint}`,
      data,
    });
  }

  postMultipartFormData<DataT = any>(
    endPoint: string,
    data: FormData,
    headers = {}
  ) {
    return this.instance<Response<DataT>>({
      method: "POST",
      url: `${endPoint}`,
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
      data,
    });
  }

  postFormUnlencoded<DataT = any>(endPoint: string, data: DataForm) {
    return this.instance<Response<DataT>>({
      method: "POST",
      url: `${endPoint}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
  }

  put<DataT = any>(endPoint: string, data: object) {
    return this.instance<Response<DataT>>({
      method: "PUT",
      url: endPoint,
      data,
    });
  }

  patch<DataT = any>(endPoint: string, data: object = {}) {
    return this.instance<Response<DataT>>({
      method: "PATCH",
      url: endPoint,
      data,
    });
  }

  putFormData<DataT = any>(endPoint: string, data: DataForm) {
    return this.instance<Response<DataT>>({
      method: "PUT",
      url: `${endPoint}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  }

  delete<DataT = any>(endPoint: string) {
    return this.instance<Response<DataT>>({
      method: "DELETE",
      url: `${endPoint}`,
    });
  }
}
