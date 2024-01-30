import Link from "next/link.js";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { useSession } from "next-auth/react";
import Login from "./Login";
import Logout from "./Logout";
import Image from "next/image";
import kiki from "/public/images/kikis-broom-nuage 1.svg";
import cafeMug from "/public/images/cafe-mug.svg";

export default async function Navbar() {
  const session = await getAuthSession();
  return (
    <>
      <footer className="boder-gray-200 bg-footer-vector  z-30 m-0  flex w-full flex-col p-0 text-mc-violet transition-all">
        <div className="my-auto flex  w-full justify-center align-bottom">
          <Image src={cafeMug} alt="cafe-mug" />
          <p className="mt-auto h-fit w-40 text-center leading-3">
            Designed by
            <Link
              href="https://www.rafaeladsdo.com/"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Rafaela
            </Link>
            @2023
          </p>
        </div>
      </footer>
    </>
  );
}
