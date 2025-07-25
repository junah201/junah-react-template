import { isAxiosError, AxiosResponse, AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { Response } from "@/types/common";

type TanstackMutationOptions<DataT> = NonNullable<
  Parameters<typeof useMutation<DataT>>[2]
>;

type CustomMutationOptions<DataT> = {
  successRedirect?: string;
  successMessage?:
    | string
    | ((data: DataT) => { title: string; description?: string });
  successQueryKey?: string | string[];
  errorMessage?:
    | string
    | ((err: AxiosError<DataT>) => { title: string; description?: string });
};

type MutationOptions<DataT> = TanstackMutationOptions<DataT> &
  CustomMutationOptions<DataT>;

export const useCustomMutation = <DataT>(
  mutationFn: (userInput?: any) => Promise<AxiosResponse<Response<DataT>>>,
  options: MutationOptions<Response<DataT>> = {}
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { toast } = useToast();

  const mutation = useMutation(mutationFn, {
    onSuccess: (res, variables, context) => {
      if (options.successMessage) {
        const message =
          typeof options.successMessage === "string"
            ? { title: options.successMessage }
            : options.successMessage(res.data);

        toast({
          variant: "default",
          ...message,
        });
      }

      if (options.successQueryKey) {
        if (typeof options.successQueryKey === "string") {
          queryClient.refetchQueries(options.successQueryKey);
        } else if (Array.isArray(options.successQueryKey)) {
          options.successQueryKey.forEach((key) => {
            queryClient.refetchQueries(key);
          });
        }
      }

      if (options.onSuccess) {
        options.onSuccess(res.data, variables, context);
      }

      if (options.successRedirect) {
        navigation(options.successRedirect);
      }
    },
    onError: (err, variables, context) => {
      if (!isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: "알 수 없는 에러가 발생했습니다.",
          description: JSON.stringify(err),
        });
        return;
      }

      if (err.response?.status === 401) {
        toast({
          variant: "destructive",
          title: "로그인 세션이 만료되었습니다.",
        });
        location.reload();
        return;
      }

      if (options?.errorMessage) {
        const message =
          typeof options.errorMessage === "string"
            ? {
                title: options.errorMessage,
                description: `${err.response?.status} ${err.response?.data.message}`,
              }
            : options.errorMessage(err);

        toast({
          variant: "destructive",
          ...message,
        });
      } else {
        const status = err.response?.status;
        const error =
          err.response?.data.message || err.message || JSON.stringify(err);

        toast({
          variant: "destructive",
          title: `알 수 없는 에러가 발생했습니다.`,
          description: `${status} ${error}`.trim(),
        });
      }

      if (options.onError) {
        options.onError(err, variables, context);
      }
    },
  });

  return mutation;
};
