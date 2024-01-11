import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <main
      className={cn(
        "max-auto mx-auto mb-auto mt-32 w-full max-w-screen-2xl px-6 ",
        className,
      )}
    >
      {children}
    </main>
  );
}

export default MaxWidthWrapper;
