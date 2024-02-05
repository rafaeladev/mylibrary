"use client";

import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex w-full justify-center align-middle transition-all">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          `${pathname == "/" ? "text-mc-violet" : ""}`,
        )}
      >
        ACCUEIL
      </Link>

      <Link
        href="/about"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          `${pathname == "/about" ? "text-mc-violet" : ""}`,
        )}
      >
        ABOUT
      </Link>
    </div>
  );
}
