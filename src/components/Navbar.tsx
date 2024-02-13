import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/nextauth";
import Login from "./Login";
import Logout from "./Logout";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const session = await getAuthSession();
  const id = session?.user?.id;

  return (
    <nav className="fixed top-0 z-50 w-full bg-header-vector p-2 text-mc-white transition-all">
      <div className="flex h-full w-full flex-col justify-center align-middle">
        <div className="flex items-center justify-center sm:w-full">
          <Link href="/" className="z-40 flex text-center font-serif text-2xl">
            <span className="leading-6">Bibliela</span>
          </Link>
          {/* todo : add mobile navbar */}
        </div>
        <div className="flex w-full justify-center gap-4 align-middle">
          <NavLinks id={id} session={session} />
        </div>
      </div>
    </nav>
  );
}
