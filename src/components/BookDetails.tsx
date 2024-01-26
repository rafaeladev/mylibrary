import React, { useState, useEffect } from "react";
import axios from "axios";
import { Book } from "../../prisma/client";
import BookCard from "../components/BookCard";

import { useSession } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";

interface Books {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  favorite: boolean;
  authors: string[];
  type: string;
  category: string;
  status: boolean;
  rate: number;
}

interface BookDetailsProps {
  bookId: number;
}

export default function BookDetails({ bookId }: BookDetailsProps) {
  const [bookDetails, setBookDetails] = useState<Books | null>(null);

  // Modifying the book
  const [editedBook, setEditedBook] = useState<Books | null>(null);
  const isLoggedIn = true;
  // const { data: session, status } = useSession();

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

  // Fonction pour chercher les données dans la BD prisma et afficher
  useEffect(() => {
    // console.log("useEffect appellé");
    const fetchData = async () => {
      try {
        let apiUrl = `/api/getUniqueBook?bookId=${bookId}`;

        const response = await axios.get(apiUrl);
        const booksResponse = response.data;

        // console.log("Response data", booksResponse);

        // const booksWithTypeName = await Promise.all(
        //     booksResponse.map(async (book: Book) => {
        // Récupérer le nom du type en utilisant getUniqueType
        const typeResponse = await axios.get(
          `/api/getUniqueType?typeId=${booksResponse.typeId}`,
        );
        const type = typeResponse.data;

        // Récupérer le nom de la categorie en utilisant getUniqueCat
        const categoryResponse = await axios.get(
          `/api/getUniqueCategory?categoryId=${booksResponse.categoryId}`,
        );
        const category = categoryResponse.data;

        // Récupérer le nom des auteurs du livre
        const authors = await getAuthorsForBook(booksResponse.id);

        // Transformation du modèle PrismaBook en modèle Book
        const showedBook: Books = {
          id: booksResponse.id,
          title: booksResponse.title,
          description: booksResponse.description || "",
          imgUrl: booksResponse.image || "",
          favorite: booksResponse.favorite || false,
          authors: authors || "Unknown Authors",
          type: type?.name || "Unknown Type",
          category: category?.name || "Unknown Category",
          status: booksResponse.status,
          rate: booksResponse.rate,
        };

        //     })
        // );

        setBookDetails(showedBook);

        // setTypes et setCategories sont sûrs à appeler même si le composant est démonté
        // console.log("Updating state with books:", showedBook);
        // setBookDetails(showedBook);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();

    // Nettoyage de l'effet
    // return () => {};
  }, []);

  // console.log("Book Details : ", bookDetails);

  async function handleDelete(bookId: number) {}

  if (!bookDetails) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <BookCard
        key={bookDetails.id}
        id={bookDetails.id}
        title={bookDetails.title}
        description={bookDetails.description}
        img={bookDetails.imgUrl}
        favorite={bookDetails.favorite}
        type={bookDetails.type}
        category={bookDetails.category}
        authors={bookDetails.authors}
        status={bookDetails.status}
        rate={bookDetails.rate}
      />
    </>
  );
}
