import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[2001] w-full",
        "flex justify-center items-start"
      )}
    >
      {children}
    </div>
  );
};

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Progress className="w-full" />
    </LoaderWrapper>
  );
};

export default Loader;
