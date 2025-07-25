import { RegisterOptions } from "react-hook-form";

export interface Option {
  label: string | React.ReactNode;
  value: string | number | boolean | null;
}

export const INPUT_TYPES = {
  TEXT: "text",
  PASSWORD: "password",
  NUMBER: "number",
  DATE: "date",
  TEXTAREA: "textarea",
  FILE: "file",
  CHECKBOX: "checkbox",
  SELECT: "select",
  DATETIME: "datetime-local",
} as const;

type InputSchema = typeof INPUT_TYPES;
type InputKeys = keyof typeof INPUT_TYPES;
export type InputTypes = InputSchema[InputKeys];

export interface InputBase {
  name: string;
  label?: string;
  type: InputTypes;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  rules?: RegisterOptions;
  options?: Option[];
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const INPUT: Record<string, InputBase> = {
  EMAIL: {
    name: "email",
    label: "이메일",
    type: INPUT_TYPES.TEXT,
    helperText: "이메일을 입력해주세요.",
    rules: {
      required: "이메일을 입력해주세요.",
      pattern: {
        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "이메일 형식이 올바르지 않습니다.",
      },
    },
  },
  PASSWORD: {
    name: "password",
    label: "비밀번호",
    type: INPUT_TYPES.PASSWORD,
    helperText: "비밀번호를 입력해주세요.",
    rules: {
      required: "비밀번호를 입력해주세요.",
      minLength: {
        value: 8,
        message: "비밀번호는 8자 이상이어야 합니다.",
      },
    },
  },
} as const;
