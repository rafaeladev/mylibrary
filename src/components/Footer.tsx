import Link from "next/link.js";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { useSession } from "next-auth/react";
import Login from "./Login";
import Logout from "./Logout";

export default async function Navbar() {
  const session = await getAuthSession();
  return (
    // <footer className=" h-22 boder-gray-200 inset-x-0 bottom-0 z-30 mt-auto flex w-full flex-col border-r bg-mc-beige p-2 text-mc-violet backdrop-blur-lg transition-all">
    <footer className="fixed inset-x-0 bottom-0 z-30 w-full bg-mc-beige p-2 text-mc-violet">
      {/* <MaxWidthWrapper> */}
      <div className="flex w-full  justify-center align-middle ">
        <p>
          Designed by
          <Link
            href="/bibliotheque"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Rafaela
          </Link>
          @2023
        </p>
      </div>
      {/* </MaxWidthWrapper> */}
    </footer>
  );
}
