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
    <main className={"mx-auto mt-64 w-full max-w-screen-2xl px-6 "}>
      {children}
    </main>
  );
}

export default MaxWidthWrapper;
