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
      <Link
        href="/"
        className=" opacity-90 transition-all  hover:text-mc-marrom hover:opacity-100"
      >
        <figure className="relative mb-48 ml-auto w-fit">
          <Image src={Backto} alt="BacktoImage" />
          <p className="absolute left-10 top-1/2 w-1/2 text-left ">
            Retourner à <span className="text-mc-white">la bibliothèque</span>{" "}
            avec tous les livres
          </p>
        </figure>
      </Link>
    </div>
  );
};

export default page;
