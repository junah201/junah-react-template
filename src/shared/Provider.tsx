import dayjs from "dayjs";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@/hooks/useCustomQuery";

import "dayjs/locale/ko";

dayjs.locale("ko");

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
};

export default Providers;
