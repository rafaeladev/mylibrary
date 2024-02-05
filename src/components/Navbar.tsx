import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/nextauth";
import Login from "./Login";
import Logout from "./Logout";

export default async function Navbar() {
  const session = await getAuthSession();
  return (
    <nav className="fixed top-0 z-50 w-full bg-header-vector p-2 text-mc-white transition-all">
      <div className="flex items-center justify-center sm:w-full">
        <Link href="/" className="z-40 flex text-center font-serif text-2xl">
          <span>Bibliela</span>
        </Link>
        {/* todo : add mobile navbar */}
      </div>
      <div className="flex w-full justify-center align-middle">
        <Link
          href="/"
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
      </div>
    </nav>
  );
}
