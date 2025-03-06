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
      <div className="mx-auto mt-16 w-full sm:w-3/5">
        <h1 className="w-full origin-bottom-left -skew-y-2 transform text-left font-serif text-3xl text-mc-marrom sm:text-5xl ">
          A propos du site
        </h1>

        <p className="mx-auto w-full text-center sm:text-left">
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
        <p className="mx-auto my-6 text-center sm:text-left">
          L’objetif était de créer un répertoire en ligne de ma bibliothèque,
          donc c’est un site d’utilisation à titre personnel.
        </p>
      </div>

      <div className="relative mx-auto flex flex-col justify-center text-center align-bottom text-sm text-mc-marrom  sm:text-xl lg:flex-row">
        <div className={`mx-auto flex`}>
          <p
            className={`mt-2 animate-fadeIn ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
            {`If I lose`}
          </p>
          <span
            className={`mx-2 mt-0 block -skew-y-6 transform animate-fadeIn font-serif text-3xl  text-mc-rose delay-150 sm:mt-4 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            my magic
          </span>
        </div>

        <p
          className={`mt-2 animate-fadeIn delay-200 lg:mt-16 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >{`, that means I've lost`}</p>

        <span
          className={`mx-10 -mt-2 block -skew-y-6 transform animate-fadeIn text-left font-serif text-3xl text-mc-rose delay-300 sm:text-center lg:mt-8 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          absolutely
        </span>

        <div className={`mx-auto flex sm:mx-auto`}>
          <span
            className={`-mt-10  block skew-y-0 transform animate-fadeIn text-center font-serif text-3xl text-mc-rose delay-500 sm:-skew-y-6 lg:mt-12 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            everything
          </span>
          <p
            className={`-mt-8 animate-fadeIn text-mc-beigeClair delay-700 lg:mt-24 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <i className="non-italic text-2xl text-mc-violet">{`"`}</i>
          </p>
        </div>
        <p
          className={`-mt-4 animate-fadeIn text-mc-beigeClair delay-700 lg:mt-24 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {`- Kiki`}
        </p>
      </div>
    </>
  );
};

export default Page;
