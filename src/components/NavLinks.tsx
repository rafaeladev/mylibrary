"use client";

import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Login from "./Login";
import Logout from "./Logout";

interface User {
  id: number;
  username: string;
  email: string;
  // Ajoutez d'autres propriétés au besoin
}

interface Session {
  user: User;
  // Ajoutez d'autres propriétés au besoin
}

interface NavLinksProps {
  id: number;
  session: Session;
}

export default function NavLinks({ id, session }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <div className="mt-2 flex w-full justify-center align-middle transition-all">
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
      <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
        {session ? <Logout /> : <Login />}
      </div>
      {id === 1 && (
        <Link
          href="/create"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            `${pathname == "/create" ? "text-mc-violet" : ""}`,
          )}
        >
          ADD LIVRE
        </Link>
      )}
    </div>
  );
}
