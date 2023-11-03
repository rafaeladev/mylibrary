// AuthorsSelect.tsx
import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

interface Author {
    id?: number;
    name: string;
}

interface AuthorsSelectProps {
    onChange: (selectedAuthors: Author[]) => void;
    value: Author[];
    addAuthors: (inputValue: string) => void;
    authors: Author[];
}

const AuthorsSelect: React.FC<AuthorsSelectProps> = React.memo(
    ({ onChange, value, addAuthors, authors }) => {
        // const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            console.log('Authors updated in AuthorsSelect:', authors);
            onChange(value);
        }, [authors, value]);

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
                value={value}
                onChange={(selectedAuthors) => {
                    onChange(selectedAuthors as Author[]);
                }}
                onCreateOption={(inputValue) => addAuthors(inputValue)}
            />
        );
    }
);

AuthorsSelect.displayName = 'AuthorsSelect';

export default AuthorsSelect;
