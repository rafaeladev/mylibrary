"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";
import Image from "next/image";
import Banners from "/public/images/Title.svg";

import { useState } from "react";

export type FilterType = {
  filterBy: string | null;
  filterValue: number | boolean | null;
};

const Page = () => {
  const [filters, setFilters] = useState<FilterType[] | null>(null);

  return (
    <>
      <figure className="mx-auto mb-2 mt-20 w-fit sm:mb-4 sm:mt-24 lg:mb-24">
        <Image src={Banners} alt="BacktoImage" />
      </figure>
      <div className="flex flex-col gap-2 md:flex-row md:justify-center">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      <BookShelves filters={filters} />
    </>
  );
};

export default Page;
