import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../../../prisma/client";
import BookCard from "../BookCard";
import BookCover from "../BookCover";
import { FilterType } from "@/app/page";

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

function BookShelves({ filters }: BookShelvesProps) {
  const [booksList, setBooksList] = useState<Books[]>([]);

  async function getAuthorsForBook(bookId: number): Promise<string[]> {
    try {
      const authorsResponse = await axios.get(
        `/api/getAuthorsForBook?bookId=${bookId}`,
      );

      // console.log('authorsResponse:', authorsResponse);
      return authorsResponse.data.map((author: any) => author);
    } catch (error) {
      console.error("Erreur lors de la récupération des auteurs", error);
      return [];
    }
  }

  const fetchData = async (filters: FilterType[] | null) => {
    try {
      const apiUrl = "/api/getBooks";

      // console.log("apiUrl avec filter", apiUrl);
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
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  // Fonction pour chercher les données dans la BD prisma et afficher
  useEffect(() => {
    fetchData(filters);

    // Nettoyage de l'effet
    return () => {};
  }, [setBooksList, filters]);

  const booksCardList = booksList.map((book) => {
    return <BookCover key={book.id} id={book.id} img={book.image} />;
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
        {booksCardList}
      </div>
    </>
  );
}

export default BookShelves;
