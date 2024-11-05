import { BasicInputProps } from "..";

import { FormItem } from "@/components/ui/form";
import { HelperText } from "@/components/ui/helperText";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const TextareaInput = (props: BasicInputProps) => {
  const {
    name,
    value,
    onChange,
    errorMessage,
    label,
    placeholder,
    helperText,
    disabled,
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
      <Textarea
        id={name}
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
