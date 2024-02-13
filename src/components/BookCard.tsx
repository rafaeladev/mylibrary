import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Backto from "/public/images/Backto.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";

import Image from "next/image";
import DeleteBookModal from "./DeleteBookModal";
import { useSession } from "next-auth/react";

interface NextConfig {
  publicRuntimeConfig: {
    basePath: string;
    // Autres configurations ici
  };
}

interface CardCompProps {
  handleEditBook: (book: {
    id: number;
    title: string;
    description: string;
    img: string;
    favorite: boolean;
    authors: string[];
    type: string;
    category: string;
    status: boolean;
    rate: number;
  }) => void;
  id: number;
  title: string;
  description: string;
  img: string;
  favorite: boolean;
  authors: string[];
  type: string;
  category: string;
  status: boolean;
  rate: number;
}

function BookCard({
  handleEditBook,
  id,
  title,
  description,
  img,
  favorite,
  type,
  category,
  authors,
  status,
  rate,
}: CardCompProps) {
  let authorsName: (string | JSX.Element)[] = authors;

  if (authors.length > 1) {
    authorsName = authors.map((name, index) => <li key={index}>{name}</li>);
  }
  // suprimer des livres
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // user
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleDeleteClick = () => {
    // Ouvrir le modal lorsque l'utilisateur clique sur "Supprimer"
    setDeleteModalOpen(true);
  };

  // Icons images
  const starImg = `/images/star.svg`;
  const fullStarImg = `/images/star-full.svg`;
  const heartImg = `/images/heart-full.svg`;

  const starFull = (
    <Image src={fullStarImg} alt="Icone star rempli" width={25} height={25} />
  );
  const starEmpty = (
    <Image src={starImg} alt="Star vide icon" width={25} height={25} />
  );

  let divRate = [];

  for (let i = 0; i < 5; i++) {
    divRate[i] = <li key={`${i}-${id}-EmptyStar`}>{starEmpty}</li>;
  }

  for (let i = 0; i < rate; i++) {
    divRate[i] = <li key={`${i}-${id}-StarFull`}>{starFull}</li>;
  }

  return (
    <Card className="w-full" key={id}>
      <CardContent className="mb-24 grid grid-cols-1  sm:mb-36 sm:grid-cols-3 sm:gap-x-8 sm:px-16">
        <figure
          className={
            "max-auto mb-8 flex items-center justify-center sm:mb-auto "
          }
        >
          <img src={img} alt={"Cover Page"} width={180} height={250} />
        </figure>
        <div className="col-span-2 text-left text-mc-violet">
          <div>
            <h3 className="uppercase text-mc-beige">TITRE</h3>
            <CardTitle className="pl-2">{title}</CardTitle>
          </div>
          <div className={"grid grid-cols-2 grid-rows-3 gap-y-6 py-6"}>
            <div>
              <h3 className="uppercase text-mc-beige">auteur(s)</h3>
              <p className="pl-2">{authors}</p>
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Statut</h3>
              <span
                className={`pl-2 ${status ? "text-mc-green" : "text-mc-rose"}`}
              >
                {status ? "Dans la bilbiothèque" : "Prété"}
              </span>
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Notation</h3>

              <ul className="flex gap-1">{divRate}</ul>
            </div>
            <div className={`mb-auto text-mc-violet`}>
              {favorite && (
                <span className="uppercase text-mc-beige">COUP DE CEUR</span>
              )}
              {favorite ? (
                <Image
                  src={heartImg}
                  alt="Mon Image"
                  width="0"
                  height="0"
                  style={{
                    width: "30px",
                    height: "auto",
                    paddingLeft: "0.5rem",
                  }}
                />
              ) : null}
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Type</h3>
              <p className="pl-2">{type}</p>
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Catégorie</h3>
              <p className="pl-2">{category}</p>
            </div>
          </div>

          <div>
            <h3 className="uppercase text-mc-beige">Description</h3>
            <p>{description}</p>
          </div>

          {userId === 1 && (
            <div className="z-10 mx-auto mt-4 flex w-1/2 flex-col justify-center gap-2 pt-0 align-middle sm:mx-0 sm:w-fit sm:flex-row sm:justify-start sm:gap-10 sm:pt-4">
              {/* Bouton Modifier */}
              <Link href={`/modifier/${id}`} className="w-full">
                <button
                  className={buttonVariants({
                    variant: "default",
                    size: "lg",
                    className: "mt-2 sm:mt-5",
                  })}
                >
                  Modifier
                </button>
              </Link>

              {/* Bouton Supprimer */}
              <button
                className={buttonVariants({
                  variant: "destructive",
                  size: "s",
                  className: "mt-1 sm:mt-5",
                })}
                onClick={handleDeleteClick}
              >
                Supprimer
              </button>
              {/* DeleteBookModal */}
              {isDeleteModalOpen && (
                <DeleteBookModal
                  bookId={id}
                  onClose={() => setDeleteModalOpen(false)}
                  isOpen={isDeleteModalOpen}
                />
              )}
            </div>
          )}
        </div>
        <Link
          href="/"
          className="mt-16 opacity-90 transition-all hover:text-mc-marrom hover:opacity-100 sm:col-start-3"
        >
          <figure className="relative z-10 mb-0 w-fit sm:mb-48 sm:ml-auto">
            <Image
              src={Backto}
              alt="BacktoImage"
              style={{
                width: "90%",
                maxWidth: "479px",
                height: "auto",
                marginInline: "auto",
              }}
            />
            <p className="absolute left-8 top-1/2 w-3/4 text-left sm:top-16 sm:w-1/2">
              Retourner à <span className="text-mc-white">la bibliothèque</span>
            </p>
          </figure>
        </Link>
      </CardContent>
    </Card>
  );
}

export default BookCard;
