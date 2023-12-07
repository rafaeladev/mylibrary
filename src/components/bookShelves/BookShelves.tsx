import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../../../prisma/client';
import BookCard from '../BookCard';

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
}
interface BookShelvesProps {
    filterBy: string;
}

function BookShelves({ filterBy }: BookShelvesProps) {
    const [booksList, setBooksList] = useState<Books[]>([]);

    async function getAuthorsForBook(bookId: number): Promise<string[]> {
        try {
            const authorsResponse = await axios.get(`/api/getAuthorsForBook?bookId=${bookId}`);

            // console.log('authorsResponse:', authorsResponse);
            return authorsResponse.data.map((author: any) => author);
        } catch (error) {
            console.error('Erreur lors de la récupération des auteurs', error);
            return [];
        }
    }

    // Fonction pour chercher les données dans la BD prisma et afficher
    useEffect(() => {
        // console.log('Fetching data...');
        const fetchData = async () => {
            try {
                // const [booksResponse] = await Promise.all([axios.get<Book[]>('/api/getBooks')]);

                const response = await axios.get(
                    `/api/getBooks${filterBy ? `?filterBy=${filterBy}` : ''}`
                );

                const booksResponse = response.data;

                // console.log('Fetched data:', booksResponse.data);

                const booksWithTypeName = await Promise.all(
                    booksResponse.map(async (book: Book) => {
                        // Récupérer le nom du type en utilisant getUniqueType
                        const typeResponse = await axios.get(
                            `/api/getUniqueType?typeId=${book.typeId}`
                        );
                        const type = typeResponse.data;

                        // Récupérer le nom de la categorie en utilisant getUniqueCat
                        const categoryResponse = await axios.get(
                            `/api/getUniqueCategory?categoryId=${book.categoryId}`
                        );
                        const category = categoryResponse.data;

                        // Récupérer le nom des auteurs du livre
                        const authors = await getAuthorsForBook(book.id);

                        // Transformation du modèle PrismaBook en modèle Book
                        const showedBook: Books = {
                            id: book.id,
                            title: book.title,
                            description: book.description || '',
                            imgUrl: book.image || '',
                            favorite: book.favorite || false,
                            authors: authors || 'Unknown Authors',
                            type: type?.name || 'Unknown Type',
                            category: category?.name || 'Unknown Category',
                            status: book.status,
                        };

                        return showedBook;
                    })
                );

                // setTypes et setCategories sont sûrs à appeler même si le composant est démonté
                setBooksList(booksWithTypeName);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();

        // Nettoyage de l'effet
        return () => {};
    }, []);

    const booksCardList = booksList.map((book) => {
        return (
            <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                description={book.description}
                img={book.imgUrl}
                favorite={book.favorite}
                type={book.type}
                category={book.category}
                authors={book.authors}
                status={book.status}
            />
        );
    });

    return (
        <>
            <h1>Book List</h1>
            {booksCardList}
        </>
    );
}

export default BookShelves;
