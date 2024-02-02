"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";
import { useState } from "react";

const Page = () => {
  return (
    <div className="mx-auto mb-36 w-1/2 text-center text-mc-violet">
      <h1 className=" w-fit origin-bottom -rotate-12 text-left font-serif text-3xl text-mc-marrom sm:text-5xl ">
        A propos du site
      </h1>
      <p className="mx-auto">
        Ce site a été fait dans le cadre d’un projet personnel par
        <span className="ml-1 text-mc-rose">RAFAELA DA SILVA DE OLIVEIRA</span>.
        Les illustrations sont un hommage au film <b>Kiki’s delivery Service</b>{" "}
        du
        <span className="ml-1 text-mc-green">@Studio Ghibli</span>.
      </p>
      <p className="my-6">
        L’objetif était de créer un répertoire en ligne de ma bibliothèque, donc
        c’est un site d’utilisation à titre personnel.
      </p>
    </div>
  );
};

export default Page;
