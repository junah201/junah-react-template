import { UseFormRegister } from "react-hook-form";

export interface FormRules<RegisterField = any> {
  required?: string;
  min?: {
    value: number | string;
    message: string;
  };
  max?: {
    value: number | string;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (input: string, values: RegisterField) => boolean | string;
}

export interface Option {
  label: string | React.ReactNode;
  value: string | any;
}

export const INPUT_TYPES = Object.freeze({
  TEXT: "text",
  PASSWORD: "password",
  NUMBER: "number",
  DATE: "date",
  TEXTAREA: "textarea",
  FILE: "file",
  CHECKBOX: "checkbox",
  SELECT: "select",
  DATETIME: "datetime-local",
});

type InputSchema = typeof INPUT_TYPES;
type InputKeys = keyof typeof INPUT_TYPES;
export type InputTypes = InputSchema[InputKeys];

export const INPUT = Object.freeze({
  EMAIL: Object.freeze({
    name: "email",
    label: "이메일",
    type: INPUT_TYPES.TEXT,
    placeholder: "이메일",
    helperText: "이메일을 입력해주세요.",
    disabled: false,
    rules: Object.freeze({
      required: "이메일을 입력해주세요.",
      pattern: Object.freeze({
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "이메일 형식이 올바르지 않습니다.",
      }),
    }),
  }),
  PASSWORD: Object.freeze({
    name: "password",
    label: "비밀번호",
    type: INPUT_TYPES.PASSWORD,
    placeholder: "●●●●●●●●",
    helperText: "비밀번호를 입력해주세요.",
    disabled: false,
    rules: Object.freeze({
      required: "비밀번호를 입력해주세요.",
      minLength: Object.freeze({
        value: 8,
        message: "비밀번호는 8자 이상이어야 합니다.",
      }),
    }),
  }),
});

export type RegisterTypes = (typeof INPUT)[keyof typeof INPUT]["name"];
export type RegisterField = Record<RegisterTypes, any>;
export type RegisterForm = UseFormRegister<RegisterField>;

export type FormInputType = (typeof INPUT)[keyof typeof INPUT];
