"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PageTitle from "@/components/PageTitle";

import BookForm from "@/components/form/BookForm";

const page = () => {
  return (
    <div className=" mx-auto flex flex-col justify-center text-center">
      <PageTitle title="Ajouter" color="green" />
      <BookForm />
    </div>
  );
};

export default page;
