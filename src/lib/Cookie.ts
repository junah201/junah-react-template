import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (
  key: Parameters<Cookies["set"]>[0],
  value: Parameters<Cookies["set"]>[1],
  option: Parameters<Cookies["set"]>[2]
) => {
  return cookies.set(key, value, {
    path: "/",
    ...option,
  });
};

export const getCookie = (key: Parameters<Cookies["get"]>[0]) => {
  return cookies.get(key);
};

export const removeCookie = (key: Parameters<Cookies["remove"]>[0]) => {
  return cookies.remove(key);
};
