import { useController, Control } from "react-hook-form";

import { BaseInput, TextareaInput, CheckboxInput, SelectInput } from "./forms";

import { InputTypes, INPUT_TYPES, InputBase } from "@/constants/form";

export interface BasicInputProps extends InputBase {
  value: any;
  onChange: (...event: any[]) => void;
  errorMessage?: string | undefined;
}

export const BasicInput = (props: BasicInputProps) => {
  const { type } = props;

  const content = (inputType: InputTypes) => {
    switch (inputType) {
      case INPUT_TYPES.TEXT:
      case INPUT_TYPES.PASSWORD:
      case INPUT_TYPES.NUMBER:
      case INPUT_TYPES.DATE:
      case INPUT_TYPES.DATETIME:
      case INPUT_TYPES.FILE:
        return <BaseInput {...props} />;
      case INPUT_TYPES.TEXTAREA:
        return <TextareaInput {...props} />;
      case INPUT_TYPES.CHECKBOX:
        return <CheckboxInput {...props} />;
      case INPUT_TYPES.SELECT:
        return <SelectInput {...props} />;
      default:
        return (
          <p>
            Invalid Input Type : <span className="font-bold">{props.type}</span>
          </p>
        );
    }
  };

  return <div className="w-full flex flex-col">{content(type)}</div>;
};

interface InputProps extends InputBase {
  control: Control<any, any>;
}

export const Input = (props: InputProps) => {
  const { name, rules, control } = props;

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    rules,
    control,
  });

  return (
    <BasicInput
      {...props}
      value={value}
      onChange={onChange}
      errorMessage={error?.message}
    />
  );
};
