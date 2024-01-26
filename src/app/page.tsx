"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";

import { useState } from "react";

const Page = () => {
  const [filterBy, setFilterBy] = useState<string>("");
  const [APIResponse, setAPIResponse] = useState<number[]>([]);
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:justify-center">
        <Filter
          // filterBy={filterBy}
          // setFilterBy={setFilterBy}
          APIResponse={APIResponse}
          setAPIResponse={setAPIResponse}
        />
      </div>
      <BookShelves APIResponse={APIResponse} />
    </>
  );
};

export default Page;
