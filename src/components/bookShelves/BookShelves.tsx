import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import BookCover from "../BookCover";
import { FilterType } from "@/app/page";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

interface Books {
  id: number;
  title: string;
  description: string;
  image: string;
  favorite: boolean;
  authors: string[];
  type: string;
  category: string;
  status: boolean;
}
interface BookShelvesProps {
  filters: FilterType[] | null;
}

// Fonction utilitaire pour diviser le tableau en lots
const chunks = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

function BookShelves({ filters }: BookShelvesProps) {
  const [booksList, setBooksList] = useState<Books[]>([]);

  const [progress, setProgress] = useState(13);
  const [isLoading, setIsLoading] = useState(true);

  // Media query pour changer la mise en page
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  async function getAuthorsForBook(bookId: number): Promise<string[]> {
    try {
      const authorsResponse = await axios.get(
        `/api/getAuthorsForBook?bookId=${bookId}`,
      );

      return authorsResponse.data.map((author: any) => author);
    } catch (error) {
      console.error("Erreur lors de la récupération des auteurs", error);
      return [];
    }
  }

  const fetchData = async (filters: FilterType[] | null) => {
    try {
      setIsLoading && setIsLoading(true);
      const apiUrl = "/api/getBooks";

      const response = await axios.get(apiUrl, {
        params: {
          categoryId: filters?.find(
            (filter: FilterType) => filter.filterBy === "category",
          )?.filterValue,
          typeId: filters?.find(
            (filter: FilterType) => filter.filterBy === "type",
          )?.filterValue,
          authorId: filters?.find(
            (filter: FilterType) => filter.filterBy === "author",
          )?.filterValue,
          status: filters?.find(
            (filter: FilterType) => filter.filterBy === "status",
          )?.filterValue,
          favorite: filters?.find(
            (filter: FilterType) => filter.filterBy === "favorite",
          )?.filterValue,
        },
      });

      const booksResponse = response.data;
      setBooksList(booksResponse);

      // Simulation d'une progression gradative
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += 10; // Ajustez selon le nombre d'étapes souhaité
        setProgress(Math.min(progress, 100));

        if (progress >= 100) {
          clearInterval(intervalId);
          setIsLoading && setIsLoading(false);
        }
      }, 100); // Ajustez l'intervalle de temps entre chaque étape
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    } finally {
      // setIsLoading && setIsLoading(false);
    }
  };

  // Fonction pour chercher les données dans la BD prisma et afficher
  useEffect(() => {
    fetchData(filters);

    // Nettoyage de l'effet
    return () => {};
  }, [setBooksList, filters]);

  // Fonction pour déterminer la taille des lots en fonction de la taille de l'écran
  const getChunkSize = () => {
    if (isTablet) {
      return 4; // Utilisez 4 éléments par ligne pour les tablettes
    } else if (isMobile) {
      return 1; // Utilisez 1 élément par ligne pour les mobiles
    } else {
      return 5; // Utilisez 5 éléments par ligne pour les autres tailles d'écran (par défaut)
    }
  };

  // Diviser la liste de livres en lots avec la taille déterminée par la fonction getChunkSize
  const booksChunks = chunks(booksList, getChunkSize());

  // const booksCardList = booksList.map((book) => {
  //   return <BookCover key={book.id} id={book.id} img={book.image} />;
  // });

  const booksCardList = booksChunks.map((chunk, index) => (
    <div
      key={index}
      className={cn(
        "border-x-6 border-t-6 border-mc-beige sm:border-x-8 sm:border-t-8",
        index % 2 === 0
          ? "flex justify-center gap-4"
          : "flex justify-center gap-4",
      )}
    >
      {chunk.map((book) => (
        <BookCover key={book.id} id={book.id} img={book.image} />
      ))}
    </div>
  ));

  return (
    <>
      {isLoading ? (
        <div className="my-80 max-w-2xl">
          <p>Loading {progress}%...</p>
          <Progress value={progress} />
        </div>
      ) : (
        <>
          <div className="fle-col bg--cover flex max-w-2xl flex-wrap">
            {booksCardList}
          </div>
          {booksList.length > 0 && (
            <div className="mx-auto mb-56 h-6 max-w-2xl bg-mc-beige"></div>
          )}
        </>
      )}
    </>
  );
}

export default BookShelves;
