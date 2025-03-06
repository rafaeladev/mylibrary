import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import BookCover from "../BookCover";
import { FilterType } from "@/app/page";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronsLeft } from "lucide-react";
import { ChevronsRight } from "lucide-react";

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

  // Mettre à jour la page actuelle lorsque les filtres changent
  useEffect(() => {
    setCurrentPage(1); // Redirigez l'utilisateur vers la première page
  }, [filters]);

  // Media query pour changer la mise en page
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px)",
  });
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

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

      const booksResponse = response.data.reverse();
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
      return 4; //4 éléments par ligne pour les tablettes
    } else if (isMobile) {
      return 2; // 2 éléments par ligne pour les mobiles
    } else {
      return 5; // 5 éléments par ligne pour les autres tailles d'écran (par défaut)
    }
  };

  // Diviser la liste de livres en lots avec la taille déterminée par la fonction getChunkSize
  const booksChunks = chunks(booksList, getChunkSize());

  // Créer une liste de cartes de livres pour chaque lot
  const booksCardList = booksChunks.map((chunk, index) => (
    <div
      key={index}
      className={cn(
        "flex justify-center gap-1 border-x-6 border-t-6 border-mc-beige px-2 py-3 align-middle lg:justify-center lg:gap-12 lg:border-x-8 lg:border-t-8",
      )}
    >
      {chunk.map((book) => (
        <BookCover key={book.id} id={book.id} img={book.image} />
      ))}
    </div>
  ));

  //====Pagination===
  const [currentPage, setCurrentPage] = useState(1);
  const [linesPerPage] = useState(4);

  const indexOfLastLine = currentPage * linesPerPage;
  const indexOfFirstLine = indexOfLastLine - linesPerPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber + 1);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (indexOfLastLine < booksList.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToLastPage = () => {
    setCurrentPage(Math.ceil(booksChunks.length / linesPerPage));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(booksChunks.length / linesPerPage);
    const currentPageIndex = currentPage - 1;
    const paginationButtons = [];

    let startPage;
    let endPage;

    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPageIndex <= 1) {
        startPage = 1;
        endPage = 4;
      } else if (currentPageIndex >= totalPages - 2) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPageIndex;
        endPage = currentPageIndex + 3;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          className={cn(
            "pagination-button",
            currentPage === i ? "active" : "",
            buttonVariants({
              variant: "outline",
              size: "s",
            }),
          )}
          key={i}
          onClick={() => paginate(i - 1)}
        >
          {i}
        </button>,
      );
    }

    return paginationButtons;
  };

  const booksThisPage = booksCardList.slice(indexOfFirstLine, indexOfLastLine);

  return (
    <>
      {isLoading ? (
        <div className="mb-32 mt-16 max-w-2xl sm:my-80">
          <p>Loading {progress}%...</p>
          <Progress value={progress} />
        </div>
      ) : (
        <>
          <div className="fle-col bg--cover flex w-full max-w-2xl flex-wrap">
            {booksList.length > 0 ? (
              booksThisPage
            ) : (
              <p>Pas de livres trouvés avec la recherche</p>
            )}
          </div>
          {booksList.length > 0 && (
            <div className="mx-auto mb-2  h-2 max-w-2xl bg-mc-beige sm:h-6"></div>
          )}

          <div className="flex justify-center align-middle">
            {currentPage > 1 && (
              <>
                {booksChunks.length > 10 && (
                  <button
                    onClick={goToFirstPage}
                    className={buttonVariants({
                      variant: "pageLink",
                      size: "s",
                    })}
                  >
                    <ChevronsLeft />
                  </button>
                )}
                <button
                  onClick={goToPreviousPage}
                  className={buttonVariants({
                    variant: "pageLink",
                    size: "s",
                  })}
                >
                  <ChevronLeft />
                </button>
              </>
            )}

            {renderPaginationButtons()}

            {indexOfLastLine < booksChunks.length && (
              <>
                <button
                  onClick={goToNextPage}
                  className={buttonVariants({
                    variant: "pageLink",
                    size: "s",
                  })}
                >
                  <ChevronRight />
                </button>
                {booksChunks.length > 10 && (
                  <button
                    onClick={goToLastPage}
                    className={buttonVariants({
                      variant: "pageLink",
                      size: "s",
                    })}
                  >
                    <ChevronsRight />
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default BookShelves;
