"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PageTitle from "@/components/PageTitle";

import BookForm from "@/components/form/BookForm";
import NewForm from "@/components/form/NewForm";
import { SessionProvider } from "next-auth/react";
const page = () => {
  return (
    <SessionProvider>
      <div className="sm:px-0text-center mx-auto flex flex-col justify-center px-6">
        <PageTitle title="Ajouter" color="green" />
        <NewForm />
      </div>
    </SessionProvider>
  );
};

export default page;
