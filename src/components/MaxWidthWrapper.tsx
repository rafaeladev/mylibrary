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
    <main className={" mx-auto mt-48 w-full max-w-2xl px-4 sm:mt-64 sm:px-6 "}>
      {children}
    </main>
  );
}

export default MaxWidthWrapper;
