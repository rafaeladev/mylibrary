"use client";
import NewForm from "@/components/form/NewForm";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

import { Button, buttonVariants } from "@/components/ui/button";

import { SessionProvider } from "next-auth/react";

interface pageProps {
  params: { id: number };
}

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

const Page: React.FC<pageProps> = ({ params }) => {
  // Your component logic here
  const bookId = params.id;

  // Gestion edition
  const [selectedBook, setSelectedBook] = useState<Books | null>(null);

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
    const fetchData = async () => {
      try {
        let apiUrl = `/api/getUniqueBook?bookId=${bookId}`;

        const response = await axios.get(apiUrl);
        const booksResponse = response.data;

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

        setSelectedBook(showedBook);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SessionProvider>
      <div className=" mx-auto flex flex-col justify-center text-center">
        <PageTitle title="Modifier" color="rose" />
        <NewForm selectedBook={selectedBook} />
      </div>
    </SessionProvider>
  );
};

export default Page;
