import Link from "next/link.js";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { Book } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";

import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { getAuthSession } from "@/lib/nextauth";

export default async function Home() {
  const session = await getAuthSession();
  console.log(session);
  return (
    <MaxWidthWrapper className="mn-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
      <div className="border-gray-200 bg-white hover:border-gray-300 hover:bg-white/50 mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border px-7 py-2 shadow-md backdrop-blur transition-all">
        <p className="text-gray-700 text-sm font-semibold">My Library</p>
      </div>
      <h1 className="md:text-6xl lg:text-7xl max-w-4xl text-5xl font-bold">
        My Library
      </h1>

      <Link
        className={buttonVariants({ size: "lg", className: "mt-5" })}
        href="/dashboard"
        target="_blank"
      >
        Home <Book className="ml-2 h-5 w-5" />
      </Link>
      {/* {session ? <Logout /> : <Login />} */}
      <pre>{JSON.stringify(session)}</pre>
    </MaxWidthWrapper>
  );
}
