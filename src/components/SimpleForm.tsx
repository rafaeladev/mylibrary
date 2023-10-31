'use client';

// Importe les modules nécessaires
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Progress } from '@/components/ui/progress';

import { useState } from 'react';
import axios from 'axios';

// Déclare l'interface pour les données du formulaire
interface FormData {
    title: string;
    imgUrl: string;
    // description: string;
    // authors: string[];
    // type: string;
    // category: string;
    // status: string;
    // favorite: boolean;
}

// Image par défaut
const defaultCoverUrl = '/default-placeholder.png';

// Crée le composant du formulaire
function ComplexForm() {
    const methods = useForm();
    const [loading, setLoading] = useState(false);

    // Initialise le hook useForm
    const { handleSubmit, register, setValue } = useForm<FormData>();

    // initialise la recherche de la couverture
    const [bookTitle, setBookTitle] = useState<string>('');
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Définit la fonction de soumission du formulaire
    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Affiche les données du formulaire dans la console
        console.log('Données soumises :', data);
    };

    // Appel pour chercher couverture
    const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            // Appel à l'API Google pour récupérer la couverture
            const response = await axios.get<string>('/api/getBookCover', {
                params: { bookTitle },
            });

            if (response.data.length > 0) {
                setCoverUrl(response.data);
                setError(null);
                setValue('imgUrl', response.data);
            } else {
                setCoverUrl('');
                setError('Aucun résultat trouvé pour la recherche actuelle.');
                setValue('imgUrl', defaultCoverUrl);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de la couverture du livre', error);
            setCoverUrl('');
            setError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    // Rendu du composant
    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='space-y-4'
            >
                {/* Champ de titre */}
                <Input
                    {...register('title', { required: 'Le titre est requis' })}
                    placeholder='Titre du livre'
                    value={bookTitle}
                    onChange={(e) => {
                        setBookTitle(e.target.value);
                    }}
                    // onBlur={(e) => handleSearch(e as any)}
                />
                <Button onClick={handleSearch}>Rechercher Couverture</Button>

                {loading && <Progress value={33} />}
                <div>
                    <FormLabel>Couverture</FormLabel>
                    {!loading && !coverUrl && (
                        <img
                            className='book-cover'
                            src={defaultCoverUrl}
                            alt='Couverture du livre par défaut'
                        />
                    )}
                    {loading && <p>Chargement en cours...</p>}
                    {coverUrl && !loading && (
                        <img
                            className='book-cover'
                            src={coverUrl}
                            alt='Couverture du livre'
                        />
                    )}
                </div>

                {/* Champ de description */}

                {/* Champ d'auteurs avec sélection multiple */}

                {/* Champ de type */}

                {/* Champ de catégorie */}

                {/* Champ de statut avec radio buttons */}

                {/* Champ de coup de cœur */}

                {/* Bouton de soumission du formulaire */}
                <Button
                    type='submit'
                    disabled={loading || !bookTitle || !coverUrl}
                >
                    Ajouter Livre
                </Button>
            </form>
        </FormProvider>
    );
}

// Exporte le composant
export default ComplexForm;
