// AuthorsSelect.tsx
import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

interface Author {
    id?: number;
    name: string;
}

interface AuthorsSelectProps {
    onChange: (selectedAuthors: Author[]) => void;
    value: Author[];
    addAuthors: (inputValue: string) => void;
    // getValues: () => FormData; // Ajoutez cette ligne pour inclure getValues
}

const AuthorsSelect: React.FC<AuthorsSelectProps> = ({ onChange, value, addAuthors }) => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loadingAuthors, setLoadingAuthors] = useState(false);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setLoadingAuthors(true);
                const response = await axios.get<Author[]>('/api/getAuthors');
                setAuthors(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des auteurs :', error);
            } finally {
                setLoadingAuthors(false);
            }
        };

        fetchAuthors();
    }, []);

    const selectOptions =
        authors?.map((author) => ({
            value: author?.name ?? '',
            label: author?.name ?? '',
            key: author?.id ?? '',
        })) || [];

    return (
        <CreatableSelect
            isMulti
            name='authors'
            options={selectOptions as any}
            isLoading={loadingAuthors}
            value={value}
            onChange={(selectedAuthors) => {
                onChange(selectedAuthors as Author[]);
            }}
            onCreateOption={(inputValue) => addAuthors(inputValue)}
        />
    );
};

export default AuthorsSelect;
