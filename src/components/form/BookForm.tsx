'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import BookCover from '@/pages/bookcover/BookCover';
import { PrismaClient } from '@prisma/client';
import { SubmitHandler } from 'react-hook-form';

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    authors: z.enum(['Author1', 'Author2', 'Author3']),
    category: z.enum(['Category1']),
    image: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    link: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
    status: z.boolean(),
    type: z.enum(['Type1']),
    favorite: z.boolean(),
});

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

// Exemple de modèle du formulaire
interface BookFormData {
    title: string;
    description: string;
    image: string;
    favorite: boolean;
    category: string;
    type: string;
    link: string;
    authors: string;
    status: boolean;
}

function BookForm() {
    // Gestion données formulaire
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            image: '',
            favorite: true,
            category: 'Category1',
            type: 'Type1',
            link: '',
            status: true,
            authors: 'Author1',
        },
    });

    const { setValue } = form;

    // Book title search
    const [bookTitle, setBookTitle] = useState<string>('');
    const [coverUrl, setCoverUrl] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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

    // Book description add
    const [bookDescription, setBookDescription] = useState<string>('');

    const [authors, setAuthors] = useState<Author[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

    const [types, setTypes] = useState<Type[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

    // 2. Define a submit handler.
    const prisma = new PrismaClient();
    const onSubmit: SubmitHandler<BookFormData> = async (data) => {
        console.log('Form data submitted:', data);
        try {
            // Supposons que "type" est une relation avec une table "Type"
            const typeData = {
                name: data.type,
            };

            const existingType = await prisma.type.findFirst({
                where: {
                    name: data.type,
                },
            });

            // Si le type existe déjà, utilise son ID, sinon crée une nouvelle entrée
            const typeId = existingType
                ? existingType.id
                : (await prisma.type.create({ data: typeData })).id;

            // Supposons que "category" est une relation avec une table "Category"
            const categoryData = {
                name: data.category,
            };

            const existingCategory = await prisma.category.findFirst({
                where: {
                    name: data.category,
                },
            });

            // Si la catégorie existe déjà, utilise son ID, sinon crée une nouvelle entrée
            const categoryId = existingCategory
                ? existingCategory.id
                : (await prisma.category.create({ data: categoryData })).id;

            const createdBook = await prisma.book.create({
                data: {
                    title: data.title,
                    description: data.description,
                    image: data.image,
                    favorite: data.favorite,
                    category: {
                        connect: { id: categoryId },
                    },
                    type: {
                        connect: { id: typeId },
                    },
                    link: data.link,
                    status: data.status,
                },
            });

            // Supposons que "authors" est une relation avec une table "Author"
            // et qu'il existe une table de liaison "Author_Books"
            const authorData = {
                name: data.authors, // Ceci est un exemple, ajuste selon ta structure réelle.
            };

            const createdAuthor = await prisma.author.create({
                data: authorData,
            });

            // Crée une entrée dans la table de liaison Author_Books
            const authorBookData = {
                authorId: createdAuthor.id,
                bookId: createdBook.id, // Utilise l'ID du livre créé précédemment
            };

            await prisma.author_Books.create({
                data: authorBookData,
            });

            // Mise à jour de la valeur des champs dans le formulaire après la soumission
            setValue('title', '');
            setValue('description', '');
            setValue('image', '');
            setValue('favorite', true);
            setValue('category', 'Category1');
            setValue('type', 'Type1');
            setValue('link', '');
            setValue('status', true);
            setValue('authors', 'Author1');

            console.log('Le livre a été enregistré avec succès.');
            const savedBook = await prisma.book.findUnique({
                where: {
                    id: createdBook.id,
                },
            });

            console.log('Informations sur le livre enregistré :', savedBook);
            return 'Le livre a été enregistré avec succès.';
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du livre", error);
            return "Erreur lors de l'enregistrement du livre";
        }
    };
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
                        <FormField
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    {/* Nom */}
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Nom du livre'
                                            value={bookTitle}
                                            onChange={(e) => setBookTitle(e.target.value)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <button
                            className={buttonVariants({ variant: 'secondary', size: 'sm' })}
                            onClick={(e) => {
                                console.log('Bouton cliqué');
                                handleSearch(e);
                            }}
                            type='button'
                        >
                            Rechercher couverture
                        </button>

                        {coverUrl && (
                            <div>
                                <FormLabel>Couverture</FormLabel>
                                <img
                                    className='book-cover'
                                    src={coverUrl}
                                    alt='Couverture du livre'
                                />
                            </div>
                        )}

                        {/* Author */}
                        <FormField
                            control={form.control}
                            name='authors'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sélectionner un ou plusieurs auteurs :</FormLabel>
                                    <Select>
                                        <select
                                            name='authors'
                                            value={selectedAuthors}
                                            onChange={(e) =>
                                                setSelectedAuthors(
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

                        {/*  Description */}
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    {/* Description */}
                                    <FormControl>
                                        <Input
                                            placeholder='Description du livre'
                                            value={bookDescription}
                                            onChange={(e) => setBookDescription(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*  Type */}
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <Select
                                        name='type'
                                        value={selectedType || ''}
                                        onValueChange={(selectedValue) =>
                                            setSelectedType(selectedValue)
                                        }
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Catégorie */}
                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catégorie</FormLabel>
                                    <Select
                                        name='category'
                                        value={selectedCategory || ''}
                                        onValueChange={(selectedValue) =>
                                            setSelectedCategory(selectedValue)
                                        }
                                    >
                                        <SelectTrigger className='w-[180px]'>
                                            <SelectValue placeholder='Choisir la category' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.name}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        {/* Status */}
                        <FormField
                            control={form.control}
                            name='status'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <RadioGroup defaultValue='present'>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='present'
                                                id='r1'
                                            />
                                            <Label htmlFor='r1'>Présent</Label>
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <RadioGroupItem
                                                value='emprunte'
                                                id='r2'
                                            />
                                            <Label htmlFor='r2'>Emprunté</Label>
                                        </div>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Cour de coeur */}
                        <FormField
                            control={form.control}
                            name='favorite'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='flex items-center space-x-2'>
                                        <Checkbox id='terms' />
                                        <Label
                                            htmlFor='terms'
                                            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                        >
                                            Coup de coeur
                                        </Label>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>Ajouter Livre</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default BookForm;
