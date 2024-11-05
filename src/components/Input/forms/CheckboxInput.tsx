import { BasicInputProps } from "..";

import { Checkbox } from "@/components/ui/checkbox";
import { FormItem } from "@/components/ui/form";
import { HelperText } from "@/components/ui/helperText";
import { Label } from "@/components/ui/label";

export const CheckboxInput = (props: BasicInputProps) => {
  const {
    name,
    value,
    onChange,
    errorMessage,
    label,
    helperText,
    disabled,
    inputProps,
    rules,
  } = props;

  return (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border py-2 px-1">
      <Checkbox
        id={name}
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
        {...inputProps}
      />
      {label && (
        <Label htmlFor={name}>
          {label} {rules?.required ? "*" : ""}
        </Label>
      )}
      <HelperText variant={errorMessage ? "destructive" : "default"}>
        {errorMessage || helperText}
      </HelperText>
    </FormItem>
  );
};
