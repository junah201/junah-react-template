import axios from "axios";
import { Cookies } from "react-cookie";

import {
  AxiosInterceptorReqConfig,
  AuthReqConfig,
  ReqRejected,
  AxiosInterceptorRes,
  AxiosRes,
  Params,
  DataForm,
  AccessToken,
} from "@/types/axios";

export class Axios {
  #instance;
  #auth;
  #cookie;
  #accessToekn;

  constructor(isAuthReq = false, baseURL = "", accessToekn: AccessToken) {
    this.#instance = axios.create({
      baseURL: `${baseURL}`,
    });
    this.#auth = isAuthReq;
    this.#cookie = new Cookies();
    this.#setInterceptor();
    this.#accessToekn = accessToekn;
  }

  /* Interceptor */
  #setInterceptor() {
    this.#instance.interceptors.request.use(
      this.#reqMiddleWare.bind(this),
      this.#reqOnError.bind(this)
    );
    this.#instance.interceptors.response.use(
      this.#resMiddleWare.bind(this),
      this.#resOnError.bind(this)
    );
  }

  /* Req */
  #reqMiddleWare(config: AxiosInterceptorReqConfig) {
    let newConfig = config;
    if (this.#auth) newConfig = this.#setAuthReq(newConfig);

    return newConfig;
  }

  #setAuthReq(config: AxiosInterceptorReqConfig): AuthReqConfig {
    const { headers } = config;
    const newConfig = {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${this.#cookie.get(this.#accessToekn.key)}`,
      },
    };

    return newConfig;
  }

  #reqOnError(error: ReqRejected) {
    return Promise.reject(error);
  }

  /* Res */
  #resMiddleWare(res: AxiosInterceptorRes) {
    const { authorization } = res.headers;

    if (authorization) {
      this.#cookie.set(this.#accessToekn.key, authorization, {
        path: "/",
      });
    }

    return res;
  }

  #resOnError(error: AxiosRes) {
    return Promise.reject(error);
  }

  get<DataT = any>(endPoint: string) {
    return this.#instance<DataT>({
      method: "GET",
      url: endPoint,
    });
  }

  getByParams<DataT = any>(endPoint: string, params: Params) {
    return this.#instance<DataT>({
      method: "GET",
      url: `${endPoint}`,
      params: params,
    });
  }

  getByParmsAsBlob(endPoint: string, params: Params) {
    return this.#instance({
      method: "GET",
      url: `${endPoint}`,
      params: params,
      responseType: "blob",
    });
  }

  post<DataT = any>(endPoint: string, data: DataForm) {
    return this.#instance<DataT>({
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
    return this.#instance<DataT>({
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
    return this.#instance<DataT>({
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
    return this.#instance<DataT>({
      method: "PUT",
      url: endPoint,
      data,
    });
  }

  patch<DataT = any>(endPoint: string, data: object = {}) {
    return this.#instance<DataT>({
      method: "PATCH",
      url: endPoint,
      data,
    });
  }

  putFormData(endPoint: string, data: DataForm) {
    return this.#instance({
      method: "PUT",
      url: `${endPoint}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
  }

  delete<DataT = any>(endPoint: string) {
    return this.#instance<DataT>({
      method: "DELETE",
      url: `${endPoint}`,
    });
  }
}
