import { BasicInputProps } from "..";

import { FormItem } from "@/components/ui/form";
import { HelperText } from "@/components/ui/helperText";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectInput = (props: BasicInputProps) => {
  const {
    name,
    value,
    onChange,
    errorMessage,
    label,
    helperText,
    disabled,
    inputProps = {},
    rules,
    placeholder,
    options,
  } = props;

  const { noHelperText = false } = inputProps;

  return (
    <FormItem>
      {label && (
        <Label htmlFor={name}>
          {label} {rules?.required ? "*" : ""}
        </Label>
      )}
      <Select
        onValueChange={onChange}
        defaultValue={value}
        disabled={disabled}
        {...inputProps}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem key={option.value + index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!noHelperText ? (
        <HelperText variant={errorMessage ? "destructive" : "default"}>
          {errorMessage || helperText}
        </HelperText>
      ) : null}
    </FormItem>
  );
};
