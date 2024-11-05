import { BasicInputProps } from "..";

import { FormItem } from "@/components/ui/form";
import { HelperText } from "@/components/ui/helperText";
import { Label } from "@/components/ui/label";

export const BoxSelectInput = (props: BasicInputProps) => {
  const {
    name,
    value,
    onChange,
    errorMessage,
    label,
    helperText,
    disabled,
    rules,
    options,
  } = props;

  const handleClick = (optionValue: string) => {
    if (disabled) return;

    const newValue = value === optionValue ? null : optionValue;

    onChange(newValue);
  };

  return (
    <FormItem className="flex flex-col items-start space-x-3 space-y-0 py-3 px-1">
      {label && (
        <Label htmlFor={name}>
          {label} {rules?.required ? "*" : ""}
        </Label>
      )}
      <div className="grid grid-cols-2 gap-4 w-full">
        {(options || []).map((option, index) => (
          <div
            key={option.value + index}
            className={`flex items-center justify-center rounded-md w-full p-3 cursor-pointer transition-colors
              ${
                value === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-primary-text hover:bg-gray-200"
              }
              ${
                index === (options || []).length - 1 &&
                (options || []).length % 2 === 1
                  ? "col-span-2"
                  : "col-span-1"
              }
              ${disabled && "opacity-50 cursor-not-allowed"}
            `}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
      <HelperText
        variant={errorMessage ? "destructive" : "default"}
        className="text-base"
      >
        {errorMessage || helperText}
      </HelperText>
    </FormItem>
  );
};
