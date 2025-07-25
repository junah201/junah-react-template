import { isAxiosError, AxiosResponse, AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";

import { useToast } from "@/hooks/use-toast";
import { Response } from "@/types/common";

type TanstackQueryOptions<DataT> = NonNullable<
  Parameters<typeof useQuery<DataT>>[2]
>;

type CustomQueryOptions<DataT> = {
  successQueryKey?: string | string[];
  successMessage?:
    | string
    | ((data: DataT) => { title: string; description?: string });
  errorMessage?:
    | string
    | ((err: AxiosError<DataT>) => { title: string; description?: string });
};

type QueryOptions<DataT> = TanstackQueryOptions<DataT> &
  CustomQueryOptions<DataT>;

export const useCustomQuery = <DataT>(
  queryKey: any[],
  queryFn: () => Promise<AxiosResponse<Response<DataT>>>,
  options: QueryOptions<Response<DataT>> = {}
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery(queryKey, queryFn, {
    keepPreviousData: options?.keepPreviousData ?? true,
    retry: options?.retry ?? 0,
    staleTime: options?.staleTime ?? 0,
    cacheTime: options?.cacheTime ?? 5 * 60 * 1000,
    onSuccess: (res) => {
      if (options?.successMessage) {
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
        queryClient.refetchQueries(options.successQueryKey);
      }

      if (options.onSuccess) {
        options.onSuccess(res.data);
      }
    },
    onError: (err) => {
      if (!isAxiosError<Response>(err)) {
        toast({
          variant: "destructive",
          title: "알 수 없는 에러가 발생했습니다.",
          description: JSON.stringify(err),
        });
        return;
      }

      // 세션 만료, 로그아웃 처리
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
        options.onError(err);
      }
    },
  });

  return query;
};
