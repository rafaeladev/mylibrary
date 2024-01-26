"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PageTitle from "@/components/PageTitle";

import BookForm from "@/components/form/BookForm";
import NewForm from "@/components/form/NewForm";

const page = () => {
  return (
    <div className=" mx-auto flex flex-col justify-center text-center">
      <PageTitle title="Ajouter" color="green" />
      <NewForm />
    </div>
  );
};

export default page;
