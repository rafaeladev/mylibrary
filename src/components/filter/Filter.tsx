import { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface FilterProps {
    filterBy: string;
    setFilterBy: (value: string) => void;
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

const Filter: FC<FilterProps> = ({ filterBy, setFilterBy }) => {
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

    return (
        <div>
            <label>
                Filter by :
                <select
                    value={selectedCategory === null ? '' : selectedCategory.toString()}
                    onChange={(e) =>
                        setSelectedCategory(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
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
            </label>

            <select
                value={selectedType === null ? '' : selectedType.toString()}
                onChange={(e) =>
                    setSelectedType(e.target.value ? parseInt(e.target.value, 10) : null)
                }
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
            <label>
                <input
                    type='checkbox'
                    checked={isFavorite}
                    onChange={() => setIsFavorite(!isFavorite)}
                />
                Favorite
            </label>
            <label>
                <input
                    type='checkbox'
                    checked={isAvaiable}
                    onChange={() => setIsAvaiable(!isAvaiable)}
                />
                Disponible
            </label>
            <button onClick={clearFilters}>Clear filter</button>
            <button onClick={applyFilters}>Apply filters</button>
        </div>
    );
};

export default Filter;
