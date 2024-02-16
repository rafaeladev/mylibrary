"use client";
import Link from "next/link.js";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import cafeMug from "/public/images/cafe-mug.svg";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer className="boder-gray-200 z-30  m-0 mt-auto flex  w-full flex-col bg-footer-vector p-0 text-mc-violet transition-all">
        {showScrollButton && (
          <button
            className="fixed bottom-6 right-6 z-50 rounded-full bg-mc-violet p-2 text-mc-white shadow-md transition-all duration-300 hover:bg-mc-rose focus:outline-none"
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}
        <div className=" my-auto flex w-full flex-col justify-center align-middle sm:flex-row sm:align-bottom">
          <Image
            src={cafeMug}
            alt="cafe-mug"
            className="mx-auto w-14 sm:mx-0 sm:w-auto"
          />
          <p className="mx-auto mt-auto h-fit w-40 text-center leading-3 sm:mx-0">
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
