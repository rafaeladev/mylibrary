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
    authors: [];
    type: string;
    category: string;
    status: boolean;
}

function BookShelves() {
    const [booksList, setBooksList] = useState<Books[]>([]);
    // Fonction pour chercher les données dans la BD prisma et afficher
    useEffect(() => {
        // console.log('Fetching data...');
        const fetchData = async () => {
            try {
                const [booksResponse] = await Promise.all([axios.get<Book[]>('/api/getBooks')]);

                // console.log('Fetched data:', booksResponse.data);

                const booksWithTypeName = await Promise.all(
                    booksResponse.data.map(async (book) => {
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

                        // Transformation du modèle PrismaBook en modèle Book
                        const showedBook: Books = {
                            id: book.id,
                            title: book.title,
                            description: book.description || '',
                            imgUrl: book.image || '',
                            favorite: book.favorite || false,
                            authors: [], //
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

    console.log(booksList);
    const booksCardList = booksList.map((book) => {
        console.log(book);
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
    console.log(booksCardList);

    return (
        <>
            <h1>Book List</h1>
            {booksCardList}
        </>
    );
}

export default BookShelves;
