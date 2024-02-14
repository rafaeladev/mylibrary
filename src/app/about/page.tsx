"use client";
import { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";
import Link from "next/link";

const Page = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <>
      <div>
        <MaxWidthWrapper>
          <div className="mx-auto w-3/5">
            <h1 className="origin-bottom-left -skew-y-2 transform text-left font-serif text-3xl text-mc-marrom sm:text-5xl ">
              A propos du site
            </h1>

            <p className="mx-auto">
              Ce site a été fait dans le cadre d’un projet personnel par
              <Link
                className="ml-1 text-mc-rose hover:text-mc-marrom"
                href={"https://www.rafaeladsdo.com/"}
              >
                RAFAELA DA SILVA DE OLIVEIRA
              </Link>
              . Les illustrations sont un hommage au film{" "}
              <b>Kiki’s delivery Service</b> du
              <span className="ml-1 text-mc-green">@Studio Ghibli</span>.
            </p>
            <p className="mx-auto my-6">
              L’objetif était de créer un répertoire en ligne de ma
              bibliothèque, donc c’est un site d’utilisation à titre personnel.
            </p>
          </div>
        </MaxWidthWrapper>
      </div>

      <div className="relative mx-auto flex justify-center text-center align-bottom text-xl text-mc-marrom">
        <p
          className={`animate-fadeIn mt-10 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {" "}
          <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
          {`If I lose`}
        </p>
        <span
          className={`animate-fadeIn mx-2 mt-4 block -skew-y-6 transform font-serif  text-3xl text-mc-rose delay-150 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          my magic
        </span>
        <p
          className={`animate-fadeIn mt-16 delay-200 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >{`, that means I've lost`}</p>
        <span
          className={`animate-fadeIn mx-1 mt-8 block -skew-y-6 transform font-serif text-3xl text-mc-rose delay-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          absolutely
        </span>
        <span
          className={`animate-fadeIn mx-1 mt-12 block -skew-y-6 transform font-serif text-3xl text-mc-rose delay-500 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          everything
        </span>
        <p
          className={`animate-fadeIn mt-24 text-mc-beigeClair delay-700 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
          {`- Kiki`}
        </p>
      </div>
    </>
  );
};

export default Page;
