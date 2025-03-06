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
      className={
        "max-w-full mx-auto mt-16 h-full w-full px-2 sm:max-w-2xl sm:px-6 "
      }
    >
      {children}
    </main>
  );
}

export default MaxWidthWrapper;
