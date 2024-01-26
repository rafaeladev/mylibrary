"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";

import { useState } from "react";

export type FilterType = {
  filterBy: string | null;
  filterValue: number | null;
};

const Page = () => {
  const [filters, setFilters] = useState<FilterType[] | null>(null);
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:justify-center">
        <Filter filters={filters} setFilters={setFilters} />
      </div>
      <BookShelves filters={filters} />
    </>
  );
};

export default Page;
