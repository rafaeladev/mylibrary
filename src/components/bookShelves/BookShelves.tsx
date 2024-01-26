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
        },
      });

      const booksResponse = response.data;

      console.log(booksResponse);
      // const booksWithTypeName = await Promise.all(
      //   booksResponse.map(async (book: Book) => {
      //     // Récupérer le nom du type en utilisant getUniqueType
      //     const typeResponse = await axios.get(
      //       `/api/getUniqueType?typeId=${book.typeId}`,
      //     );
      //     const type = typeResponse.data;

      //     // Récupérer le nom de la categorie en utilisant getUniqueCat
      //     const categoryResponse = await axios.get(
      //       `/api/getUniqueCategory?categoryId=${book.categoryId}`,
      //     );
      //     const category = categoryResponse.data;

      //     // Récupérer le nom des auteurs du livre
      //     const authors = await getAuthorsForBook(book.id);

      //     // Transformation du modèle PrismaBook en modèle Book
      //     const showedBook: Books = {
      //       id: book.id,
      //       title: book.title,
      //       description: book.description || "",
      //       imgUrl: book.image || "",
      //       favorite: book.favorite || false,
      //       authors: authors || "Unknown Authors",
      //       type: type?.name || "Unknown Type",
      //       category: category?.name || "Unknown Category",
      //       status: book.status,
      //     };

      //     return showedBook;
      //   }),
      // );

      // setTypes et setCategories sont sûrs à appeler même si le composant est démonté
      // console.log("Updating state with books:", booksWithTypeName);
      setBooksList(booksResponse);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  // Fonction pour chercher les données dans la BD prisma et afficher
  useEffect(() => {
    console.log("Fetching data...");

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
