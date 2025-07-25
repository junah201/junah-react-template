import {
  DefaultValues,
  UseFormProps,
  useForm as useReactHookForm,
} from "react-hook-form";

import { Input } from "@/components/Input";
import { InputBase } from "@/constants/form";

type FieldNamesFrom<T extends readonly InputBase[]> = {
  [K in T[number] as K["name"]]: any;
};

interface FormProps<TFields extends readonly InputBase[]> {
  onSubmit: (data: FieldNamesFrom<TFields>) => void;
  children: React.ReactNode;
  className?: string;
}

export const useForm = <TFields extends readonly InputBase[]>(
  fields: TFields,
  options?: UseFormProps<FieldNamesFrom<TFields>>
) => {
  const defaultValues = Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.inputProps?.defaultValue ?? undefined,
    ])
  ) as DefaultValues<FieldNamesFrom<TFields>>;

  const reactHookForm = useReactHookForm<FieldNamesFrom<TFields>>({
    ...options,
    defaultValues: {
      ...defaultValues,
      ...options?.defaultValues,
    },
  });

  const Form = <TFields extends readonly InputBase[]>({
    onSubmit,
    children,
    className,
  }: FormProps<TFields>) => {
    return (
      <form
        className={className}
        onSubmit={reactHookForm.handleSubmit(onSubmit)}
      >
        {fields.map((field) => (
          <Input key={field.name} control={reactHookForm.control} {...field} />
        ))}
        {children}
      </form>
    );
  };

  return {
    ...reactHookForm,
    Form,
  };
};
