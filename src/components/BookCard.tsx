import { useState } from "react";
import { useRouter } from "next/router";

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

import { Heart } from "lucide-react";

import DeleteBookModal from "./DeleteBookModal";

interface NextConfig {
  publicRuntimeConfig: {
    basePath: string;
    // Autres configurations ici
  };
}

interface CardCompProps {
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
  // const router = useRouter();
  // suprimer des livres
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteClick = () => {
    // Ouvrir le modal lorsque l'utilisateur clique sur "Supprimer"
    setDeleteModalOpen(true);
  };

  // Icons images
  const starImg = `/images/star.png`;
  const fullStarImg = `/images/star-full.png`;
  const heartImg = `/images/heart-full.png`;

  const starFull = (
    <Image src={fullStarImg} alt="Icone star rempli" width={25} height={25} />
  );
  const starEmpty = (
    <Image src={starImg} alt="Star vide icon" width={25} height={25} />
  );

  let divRate = [starEmpty, starEmpty, starEmpty, starEmpty, starEmpty];

  for (let i = 0; i < rate; i++) {
    divRate[i] = starFull;
  }

  return (
    <Card className="w-full" key={id}>
      <CardContent className="grid grid-cols-3  gap-x-8 px-16 align-middle">
        <figure className={"ml-auto flex items-center"}>
          {/* <Image src={img} alt={"Cover Page"} width={180} height={250} /> */}
          <img src={img} alt={"Cover Page"} width={180} height={250} />
        </figure>
        <div className="col-span-2 text-left text-mc-violet">
          <div>
            <h3 className="uppercase text-mc-beige">TITRE</h3>
            <CardTitle className="pl-2">{title}</CardTitle>
          </div>
          <div className={"grid grid-cols-2 grid-rows-3 gap-y-4"}>
            <div>
              <h3 className="uppercase text-mc-beige">auteur(s)</h3>
              <p className="pl-2">{authors}</p>
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Status</h3>
              <span
                className={`pl-2 ${status ? "text-mc-green" : "text-mc-rose"}`}
              >
                {status ? "Présent dans la bilbiothèque" : "Emprunté"}
              </span>
            </div>
            <div>
              <h3 className="uppercase text-mc-beige">Note</h3>

              <div className="flex gap-1"> {divRate}</div>
            </div>
            <div className={`mt-auto flex gap-2 text-mc-violet`}>
              {favorite ? (
                <Image src={heartImg} alt="Mon Image" width={25} height={25} />
              ) : (
                ""
              )}
              <span className="uppercase text-mc-beige">COUP DE CEUR</span>
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

          <div className="pt-4">
            <h3 className="uppercase text-mc-beige">Description</h3>
            <p>{description}</p>
          </div>

          <div className="flex justify-start gap-10 pt-4">
            {/* Bouton Modifier */}
            <button
              className={buttonVariants({ size: "lg", className: "mt-5" })}
            >
              Modifier
            </button>

            {/* Bouton Supprimer */}
            <button
              className={buttonVariants({
                variant: "destructive",
                size: "lg",
                className: "mt-5",
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
                // router={router}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookCard;
