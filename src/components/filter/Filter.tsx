import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface FilterProps {
    // filterBy: string;
    // setFilterBy: (value: string) => void;
    setAPIResponse: (value: number[]) => void;
    APIResponse: number[];
}

interface Author {
    id: number;
    name: string;
    value?: string;
}

interface Type {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Books {
    id: number;
}

const Filter: FC<FilterProps> = ({ APIResponse, setAPIResponse }) => {
    const [filterBy, setFilterBy] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [types, setTypes] = useState<Type[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAvaiable, setIsAvaiable] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedType, setSelectedType] = useState<number | null>(null);
    const [selectedAuthors, setSelectedAuthors] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesResponse, categoriesResponse, authorsResponse] = await Promise.all([
                    axios.get<Type[]>('/api/getType'),
                    axios.get<Category[]>('/api/getCategory'),
                    axios.get<Author[]>('/api/getAuthors'),
                ]);

                setTypes(typesResponse.data);
                setCategories(categoriesResponse.data);
                setAuthors(authorsResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données', error);
            }
        };

        fetchData();
    }, [isFavorite, isAvaiable, selectedCategory, selectedType, selectedAuthors]);

    const clearFilters = () => {
        setIsFavorite(false);
        setIsAvaiable(false);
        setSelectedCategory(null);
        setSelectedType(null);
        setSelectedAuthors(null);
        setFilterBy('');
    };

    useEffect(() => {
        console.log('Filter avant selections', filterBy);
    }, []);

    const applyFilters = () => {
        // Construisez votre filtre en fonction des valeurs sélectionnées
        let newFilter = '';

        if (selectedCategory !== null) {
            newFilter += `category:${selectedCategory}`;
        }

        if (selectedType !== null) {
            newFilter += newFilter ? `&type:${selectedType}` : `type:${selectedType}`;
        }

        if (selectedAuthors !== null) {
            newFilter += newFilter ? `&author:${selectedAuthors}` : `author:${selectedAuthors}`;
        }

        if (isFavorite) {
            newFilter += newFilter ? '&favorite:true' : 'favorite:true';
        }

        if (isAvaiable) {
            newFilter += newFilter ? '&avaiable:true' : 'avaiable:true';
        }

        setFilterBy(newFilter);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/getAuthors?filter=${filterBy}`);

            const authorsData = response.data;

            console.log('Filtered AuthorsData', authorsData);

            // Extrayez les IDs de tous les livres associés à l'auteur
            const bookIds = authorsData.map((author: any) => author.bookId);
            console.log('Book Ids:', bookIds);

            // Mettez à jour le tableau d'IDs avec les nouveaux IDs de livres
            setAPIResponse(bookIds);

            console.log('Book Ids:', APIResponse);
        } catch (error) {
            console.error("Erreur lors de la récupération des auteurs depuis l'API", error);
        }
    };

    useEffect(() => {
        console.log('Filter apres selections', filterBy);
        fetchData();
    }, [filterBy]);

    return (
        <div className='mb-10'>
            <div className='flex gap-4 align-middle justify-center'>
                <p className='font-serif text-2xl text-mc-marrom'>Filtres :</p>
                {/* <label> */}
                <select
                    value={selectedCategory === null ? '' : selectedCategory.toString()}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className='bg-mc-beige text-mc-white px-5'
                >
                    <option value=''>Categories</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id.toString()}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                {/* </label> */}

                <select
                    value={selectedType === null ? '' : selectedType.toString()}
                    onChange={(e) =>
                        setSelectedType(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className='bg-mc-beige text-mc-white px-5'
                >
                    <option value=''>Types</option>
                    {types.map((type) => (
                        <option
                            key={type.id}
                            value={type.id.toString()}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedAuthors === null ? '' : selectedAuthors.toString()}
                    onChange={(e) =>
                        setSelectedAuthors(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className='bg-mc-beige text-mc-white px-5'
                >
                    <option value=''>Authors</option>
                    {authors.map((author) => (
                        <option
                            key={author.id}
                            value={author.id.toString()}
                        >
                            {author.name}
                        </option>
                    ))}
                </select>
                <label className='flex gap-2 align-middle justify-center'>
                    <input
                        type='checkbox'
                        checked={isFavorite}
                        onChange={() => setIsFavorite(!isFavorite)}
                        className='w-4 h-4 my-auto'
                    />
                    <p className='my-auto'>Favorite</p>
                </label>
                <label className='flex gap-2 align-middle justify-center'>
                    <input
                        type='checkbox'
                        checked={isAvaiable}
                        onChange={() => setIsAvaiable(!isAvaiable)}
                        className='w-4 h-4 my-auto'
                    />
                    <p className='my-auto'>Disponible</p>
                </label>
            </div>
            <button onClick={clearFilters}>Clear filter</button>
            <button onClick={applyFilters}>Apply filters</button>
        </div>
    );
};

export default Filter;
