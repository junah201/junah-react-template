import { Control } from "react-hook-form";

import { Input } from "@/components/Input";
import { FormInputType, RegisterField } from "@/constants/form";

export interface BaseFormProps {
  control: Control<RegisterField, any>;
  fields: (FormInputType | null)[];
}

export const BaseForm = ({ control, fields }: BaseFormProps) => {
  return (
    <>
      {fields.map(
        (field) =>
          field && <Input key={field.name} control={control} {...field} />
      )}
    </>
  );
};

export default BaseForm;
