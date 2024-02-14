import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import cafeMug from "/public/images/cafe-mug.svg";
import { ChevronUpIcon } from "lucide-react";

export default async function Navbar() {
  return (
    <>
      <footer className="boder-gray-200 z-30  m-0 flex  w-full flex-col bg-footer-vector p-0 text-mc-violet transition-all">
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
