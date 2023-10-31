'use client';

// Importe les modules nécessaires
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Progress } from '@/components/ui/progress';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Importe le modèle Prisma
import { PrismaClient } from '@prisma/client';

// Initialise le client Prisma
const prisma = new PrismaClient();

// Déclare l'interface pour les données du formulaire
interface FormData {
    title: string;
    imgUrl: string;
    description: string;
    type: string;
    category: string;
    status: boolean;
    favorite: boolean;
    authors: string[];
}

// Image par défaut
const defaultCoverUrl = '/default-placeholder.png';

interface Author {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

const formSchema = z.object({
    title: z.string(),
    imgUrl: z.string(),
    description: z.string(),
    type: z.string(),
    category: z.string(),
    status: z.boolean().default(true),
    favorite: z.boolean().default(false),
    authors: z.array(z.string()),
});

// Crée le composant du formulaire
function ComplexForm() {
    const methods = useForm();
    const [loading, setLoading] = useState(false);

    // Initialise le hook useForm
    const { handleSubmit, register, setValue } = useForm<FormData>();

    type BookFormValues = z.infer<typeof formSchema>;

    const form = useForm<BookFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            imgUrl: '',
            description: '',
            type: '',
            category: 'Cat1',
            status: true,
            favorite: true,
            authors: [],
        },
        mode: 'onChange',
    });

    // initialise la recherche de la couverture
    const [bookTitle, setBookTitle] = useState<string>('');
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(''); // Nouvel état pour l'URL de l'image

    // Fonction de soumission du formulaire
    async function onSubmit(data: BookFormValues) {
        const text = JSON.stringify(data, null, 2);
        console.log('Données soumises :', text);

        // Utilise Prisma pour créer une nouvelle entrée dans la table Book
        try {
            const response = await fetch('/api/createBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, imgUrl: coverUrl }), // Mise à jour de l'URL de l'image directement ici
            });

            if (response.ok) {
                console.log('Le livre a été enregistré avec succès.');
                // Tu peux également récupérer la réponse de l'API si elle renvoie des données supplémentaires.
                const responseData = await response.json();
                console.log("Réponse de l'API :", responseData);
                return 'Le livre a été enregistré avec succès.';
            } else {
                console.error('Erreur lors de la création du livre :', response.statusText);
                // Gère l'erreur comme tu le souhaites, par exemple, en lançant une nouvelle erreur.
            }
        } catch (error) {
            console.error('Erreur lors de la création du livre :', error);
        }
    }

    // Fonction pour chercher couverture
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
                setError(`Aucun résultat trouvé pour la recherche actuelle depuis l'API.`);
                setValue('imgUrl', defaultCoverUrl);
            }
        } catch (error) {
            console.error('Erreur lors de la recherche de la couverture du livre', error);
            setCoverUrl('');
            setError(`Aucun résultat trouvé pour la recherche actuelle depuis l'API.`);
        } finally {
            setLoading(false);
        }
    };

    // Fonction pour valider l'ajout par lien externe
    const handleExternalImageSubmit = () => {
        // Vérifie si l'URL de l'image est une URL valide
        const isValidUrl = /^https?:\/\/\S+\.\S+$/.test(imageUrl);

        if (isValidUrl) {
            // Met à jour l'état coverUrl avec l'URL validée
            setCoverUrl(imageUrl);
            setError(null); // Efface les erreurs précédentes
        } else {
            // Affiche une erreur si l'URL n'est pas valide
            setError("L'URL de l'image n'est pas valide. Veuillez saisir une URL correcte.");
        }
    };

    // Book data add
    const [bookDescription, setBookDescription] = useState<string>('');

    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Fonction pour chercher les données dans la BD prisma et afficher
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authorsResponse, typesResponse, categoriesResponse] = await Promise.all([
                    axios.get<Author[]>('/api/getAuthors'),
                    axios.get<Type[]>('/api/getType'),
                    axios.get<Category[]>('/api/getCategory'),
                ]);

                setAuthors(authorsResponse.data);
                setTypes(typesResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className='w-[500px]'>
            <CardHeader>
                <CardTitle>Nouveau livre</CardTitle>
                <CardDescription>Formulaire pour ajouter un livre</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        {/* Champ de titre */}
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre du livre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='titre du livre'
                                            {...field}
                                            onChange={(e) => {
                                                setBookTitle(e.target.value); // Met à jour le state bookTitle
                                                field.onChange(e); // Appelle la fonction onChange du champ title du formulaire
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Rentrez le titre du livre ici puis cliquez sur rechercher la
                                        couverture
                                    </FormDescription>
                                    <Button
                                        className={buttonVariants({
                                            variant: 'secondary',
                                            size: 'sm',
                                        })}
                                        onClick={handleSearch}
                                    >
                                        Rechercher Couverture
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de la couverture */}
                        <FormField
                            control={form.control}
                            name='imgUrl'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Couverture</FormLabel>
                                    <FormControl> </FormControl>
                                    {loading && <Progress value={70} />}
                                    {error && (
                                        <>
                                            <FormDescription>
                                                <p className='text-red-500'>{error}</p>
                                            </FormDescription>
                                            <Input
                                                type='text'
                                                placeholder="URL de l'image"
                                                {...field}
                                                onChange={(e) => setImageUrl(e.target.value)}
                                            />
                                            {/* Bouton pour valider l'ajout par lien externe */}
                                            <Button
                                                className={buttonVariants({
                                                    variant: 'secondary',
                                                    size: 'sm',
                                                })}
                                                onClick={handleExternalImageSubmit}
                                            >
                                                {"Valider l'ajout par lien externe"}
                                            </Button>
                                        </>
                                    )}

                                    {/* Couverture par défaut */}
                                    {!loading && !coverUrl && (
                                        <img
                                            className='book-cover'
                                            src={defaultCoverUrl}
                                            alt='Couverture du livre par défaut'
                                        />
                                    )}

                                    {!loading && !coverUrl && imageUrl && (
                                        <img
                                            className='book-cover'
                                            src={imageUrl}
                                            alt='Couverture du livre'
                                        />
                                    )}

                                    {/* On affiche la couverture de l'API */}
                                    {loading && <p>Chargement en cours...</p>}
                                    {coverUrl && !loading && (
                                        <img
                                            className='book-cover'
                                            src={coverUrl}
                                            alt='Couverture du livre'
                                        />
                                    )}

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ d'auteurs avec sélection multiple */}
                        <FormField
                            control={form.control}
                            name='authors'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sélectionner un ou plusieurs auteurs :</FormLabel>
                                    <Select>
                                        <select
                                            name='authors'
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Array.from(
                                                        e.target.selectedOptions,
                                                        (option) => option.value
                                                    )
                                                )
                                            }
                                            multiple
                                        >
                                            {authors.map((author) => (
                                                <option
                                                    key={author.id}
                                                    value={author.name}
                                                >
                                                    {author.name}
                                                </option>
                                            ))}
                                        </select>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de description */}
                        <FormField
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description / Sinopsis</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Ecriz ici un petite description/sinopsis du livre'
                                            className='resize-none'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tu peux rentrer ici la description du livre
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de type */}
                        <FormField
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Choisir un type' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem
                                                        key={type.id}
                                                        value={type.name}
                                                    >
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Choisir le type de document (BD, Livre, Manga)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de catégorie */}
                        <FormField
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categorie</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className='w-[180px]'>
                                                <SelectValue placeholder='Choisir une categorie' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((type) => (
                                                    <SelectItem
                                                        key={type.id}
                                                        value={type.name}
                                                    >
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>
                                        Choisir la categorie du document (SF, roman, fantaisie)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de statut avec radio buttons */}
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <RadioGroup
                                        onValueChange={(value) => field.onChange(value === 'true')}
                                        value={field.value ? 'true' : 'false'}
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='true'
                                                id='present'
                                            />
                                            <Label htmlFor='present'>Présent</Label>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='false'
                                                id='emprunte'
                                            />
                                            <Label htmlFor='emprunte'>Emprunté</Label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Champ de coup de cœur */}
                        <FormField
                            control={form.control}
                            name='favorite'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex items-center space-x-2'>
                                        <Checkbox
                                            id='favorite'
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked)}
                                        />
                                        <Label
                                            htmlFor='favorite'
                                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Coup de coeur
                                        </Label>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Bouton de soumission du formulaire */}
                        <Button
                            type='submit'
                            // disabled={loading || !bookTitle || !coverUrl}
                        >
                            Ajouter Livre
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

// Exporte le composant
export default ComplexForm;
