'use client';
// pages/BookCover.tsx
import { useState } from 'react';
import axios from 'axios';

// Form design components
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const BookCover: React.FC = () => {
    const [bookTitle, setBookTitle] = useState<string>('');
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get<string>('/api/getBookCover', {
                params: { bookTitle },
            });

            if (response.data.length > 0) {
                setCoverUrl(response.data);
                setError(null);
            } else {
                setCoverUrl('');
                setError('Aucun résultat trouvé pour la recherche actuelle.');
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de la couverture du livre', error);
            setCoverUrl('');
            setError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
        }
    };

    return (
        <>
            <input
                type='text'
                placeholder='Titre du livre'
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
            />
            <button onClick={handleSearch}>Rechercher</button>

            {error && <p>{error}</p>}

            {coverUrl && (
                <div>
                    <h2>Résultat de la recherche :</h2>
                    <img
                        className='book-cover'
                        src={coverUrl}
                        alt='Couverture du livre'
                    />
                </div>
            )}
        </>
    );
};

export default BookCover;
