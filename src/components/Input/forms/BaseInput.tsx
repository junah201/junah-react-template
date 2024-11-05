import { BasicInputProps } from "..";

import { FormItem } from "@/components/ui/form";
import { HelperText } from "@/components/ui/helperText";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BaseInput = (props: BasicInputProps) => {
  const {
    name,
    value,
    onChange,
    errorMessage,
    label,
    placeholder,
    helperText,
    disabled,
    type,
    inputProps,
    rules,
  } = props;

  return (
    <FormItem>
      {label && (
        <Label htmlFor={name}>
          {label} {rules?.required ? "*" : ""}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        {...inputProps}
      />
      <HelperText variant={errorMessage ? "destructive" : "default"}>
        {errorMessage || helperText}
      </HelperText>
    </FormItem>
  );
};
