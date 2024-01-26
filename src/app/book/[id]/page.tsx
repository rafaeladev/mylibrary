"use client";

import BookCard from "@/components/BookCard";
import BookDetails from "@/components/BookDetails";
import PageTitle from "@/components/PageTitle";
import { useRouter } from "next/router";
import { FC } from "react";

interface pageProps {
  params: { id: number };
}

interface Book {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  favorite: boolean;
  authors: string[];
  type: string;
  category: string;
  status: boolean;
}

const page: FC<pageProps> = ({ params }) => {
  const bookId = params.id;

  return (
    <div className=" mx-auto flex flex-col justify-center text-center">
      <PageTitle title="Consulter" color="marrom" />
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default page;
