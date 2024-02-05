"use client";

import BookCard from "@/components/BookCard";
import BookDetails from "@/components/BookDetails";
import PageTitle from "@/components/PageTitle";
import Backto from "/public/images/Backto.svg";
import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

interface pageProps {
  params: { id: number };
}

const page: FC<pageProps> = ({ params }) => {
  const bookId = params.id;

  return (
    <div className=" mx-auto flex flex-col justify-center text-center ">
      <PageTitle title="Consulter" color="marrom" />
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default page;
