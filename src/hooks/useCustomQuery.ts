import { isAxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";

export { QueryClient, QueryClientProvider } from "react-query";

type QueryOptions<DataT> = NonNullable<Parameters<typeof useQuery<DataT>>[2]>;

type CustomQueryOptions<DataT> =
  | (QueryOptions<DataT> & {
      SuccessQueryKey?: string | string[];
      SuccessMessage?: string;
      ErrorMessage?: string;
    })
  | undefined;

export const useCustomQuery = <DataT = any>(
  queryKey: any[],
  queryFn: () => Promise<AxiosResponse<DataT, any>>,
  options: CustomQueryOptions<DataT> = {}
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery(queryKey, queryFn, {
    keepPreviousData: options?.keepPreviousData || true,
    retry: options?.retry || 0,
    staleTime: options?.staleTime || 0,
    cacheTime: options?.cacheTime || 5 * 60 * 1000,
    onSuccess: (res) => {
      if (options?.SuccessMessage) {
        toast({
          variant: "default",
          title: options.SuccessMessage,
        });
      }

      if (options.SuccessQueryKey) {
        queryClient.refetchQueries(options.SuccessQueryKey);
      }

      if (options.onSuccess) {
        options.onSuccess(res.data);
      }
    },
    onError: (err) => {
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

      if (options.onError) {
        options.onError(err);
      } else {
        const message =
          options.ErrorMessage || `알 수 없는 에러가 발생했습니다.`;
        const status = err.response?.status ? `${err.response?.status} ` : "";
        const error =
          err.response?.data?.detail || err.message || JSON.stringify(err);

        toast({
          variant: "destructive",
          title: message,
          description: `${status} ${error}`,
        });
      }
    },
  });

  return {
    ...query,
  };
};

type MutationOptions<DataT> = NonNullable<
  Parameters<typeof useMutation<DataT>>[2]
>;

type CustomMutationOptions<DataT> =
  | (MutationOptions<DataT> & {
      SuccessRedirect?: string;
      SuccessMessage?: string;
      SuccessQueryKey?: string | string[];
      ErrorMessage?: string;
      hideStatus?: boolean;
    })
  | undefined;

export const useCustomMutation = <DataT>(
  mutationFn: (userInput?: any) => Promise<AxiosResponse<DataT, any>>,
  options: CustomMutationOptions<DataT> = {}
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();
  const { toast } = useToast();

  const { hideStatus = false } = options;

  const mutation = useMutation(mutationFn, {
    onSuccess: (res, variables, context) => {
      if (options?.SuccessMessage) {
        toast({
          variant: "default",
          title: options.SuccessMessage,
        });
      }

      if (options?.SuccessQueryKey) {
        if (typeof options.SuccessQueryKey === "string") {
          queryClient.refetchQueries(options.SuccessQueryKey);
        } else if (Array.isArray(options.SuccessQueryKey)) {
          options.SuccessQueryKey.forEach((key) => {
            queryClient.refetchQueries(key);
          });
        }
      }

      if (options?.onSuccess) {
        options.onSuccess(res.data, variables, context);
      }

      if (options.SuccessRedirect) {
        navigation(options.SuccessRedirect);
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

      if (options.onError) {
        options.onError(err, variables, context);
        return;
      }

      const message = options.ErrorMessage || `알 수 없는 에러가 발생했습니다.`;
      const status = err.response?.status ? `${err.response?.status} ` : "";
      const error =
        err.response?.data?.detail || err.message || JSON.stringify(err);

      const description = hideStatus ? error : `${status} ${error}`;

      toast({
        variant: "destructive",
        title: message,
        description: description,
      });
    },
  });

  return {
    ...mutation,
  };
};
