"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";
import { useState } from "react";

const Page = () => {
  return (
    <>
      <div className="mx-auto mb-36 w-1/2 text-center text-mc-violet">
        <h1 className="origin-bottom-left -skew-y-2 transform text-left font-serif text-3xl text-mc-marrom sm:text-5xl">
          A propos du site
        </h1>

        <p className="mx-auto">
          Ce site a été fait dans le cadre d’un projet personnel par
          <span className="ml-1 text-mc-rose">
            RAFAELA DA SILVA DE OLIVEIRA
          </span>
          . Les illustrations sont un hommage au film{" "}
          <b>Kiki’s delivery Service</b> du
          <span className="ml-1 text-mc-green">@Studio Ghibli</span>.
        </p>
        <p className="my-6">
          L’objetif était de créer un répertoire en ligne de ma bibliothèque,
          donc c’est un site d’utilisation à titre personnel.
        </p>
      </div>
      <p className="mx-auto w-auto text-center text-mc-marrom">
        {`"If I lose`}
        <span className="mx-1 block -skew-y-6 transform font-serif  text-2.5xl text-mc-rose">
          My magic
        </span>
        ,{`that means I've lost`}
        <span className="mx-1 block -skew-y-6 transform font-serif text-2.5xl text-mc-rose ">
          absolutely
        </span>
        <span className="mx-1 block -skew-y-6 transform font-serif text-2.5xl text-mc-rose">
          everything
        </span>
        {`" - Kiki`}
      </p>
    </>
  );
};

export default Page;
