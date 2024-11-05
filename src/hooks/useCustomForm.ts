import { useForm } from "react-hook-form";

import { RegisterField } from "@/constants/form";

export const useCustomForm = (
  ...args: Parameters<typeof useForm<RegisterField, any>>
) => {
  const form = useForm<RegisterField, any>(...args);

  return {
    ...form,
  };
};
