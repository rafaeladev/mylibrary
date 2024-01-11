import React from "react";

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
}: CardCompProps) {
  let authorsName: (string | JSX.Element)[] = authors;

  if (authors.length > 1) {
    authorsName = authors.map((name, index) => <li key={index}>{name}</li>);
  }

  return (
    <Card className="w-full" key={id}>
      <CardContent className="grid grid-cols-3  gap-x-8 px-16 align-middle">
        <image className={"ml-auto"}>
          <Image src={img} alt={"Cover Page"} width={180} height={250} />
        </image>
        <div className="col-span-1.5 text-left text-mc-violet">
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
              <p className="pl-2">En cours...</p>
            </div>
            <div className={`mt-auto text-mc-violet`}>
              <Heart
                fill={`${favorite ? "true" : "false"}`}
                color="text-mc-violet"
                className="mr-2 inline"
              />
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
            >
              Supprimer
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookCard;
