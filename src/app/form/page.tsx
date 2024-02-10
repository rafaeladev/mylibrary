"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BookShelves from "@/components/bookShelves/BookShelves";
import Filter from "@/components/filter/Filter";
import NewForm from "@/components/form/NewForm";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

const Page = () => {
  return (
    <MaxWidthWrapper>
      <NewForm />
    </MaxWidthWrapper>
  );
};

export default Page;
