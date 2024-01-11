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
    <nav className=" boder-gray-200 inset-x-0 w-full border-r bg-mc-marrom p-2 text-mc-white backdrop-blur-lg transition-all">
      {/* <MaxWidthWrapper> */}
      <div className="flex w-full items-center justify-center">
        <Link href="/" className="z-40 flex text-center font-serif text-2xl ">
          <span>Bibliela</span>
        </Link>
        {/* todo : add mobile navbar */}
      </div>
      <div className="flex w-full  justify-center align-middle ">
        <>
          <Link
            href="/bibliotheque"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            ACCUEIL
          </Link>

          <Link
            href="/about"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            ABOUT
          </Link>
          <div className={buttonVariants({ variant: "ghost", size: "sm" })}>
            {session ? <Logout /> : <Login />}
          </div>
          {session && (
            <Link
              href="/create"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              ADD LIVRE
            </Link>
          )}
        </>
      </div>
      {/* </MaxWidthWrapper> */}
    </nav>
  );
}
