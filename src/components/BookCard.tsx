import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import Image from 'next/image';

interface CardCompProps {
    id: number;
    title: string;
    description: string;
    img: string;
    favorite: boolean;
    authors: string[];
    type: string;
    category: string;
    status: boolean;
}

function BookCard({
    id,
    title,
    description,
    img,
    favorite,
    type,
    category,
    authors,
    status,
}: CardCompProps) {
    let authorsName: (string | JSX.Element)[] = authors;

    if (authors.length > 1) {
        authorsName = authors.map((name, index) => <li key={index}>{name}</li>);
    }

    return (
        <Card
            className='lg:max-w-md w-full'
            key={id}
        >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
                    {favorite && 'Coup de coeur!'}
                    Type :<span>{type}</span>
                    Catégorie : <span>{category}</span>
                    Status : <span>{status ? 'Présent dans la bilbiothèque' : 'Emprunté'}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <Image
                    src={img}
                    width={500}
                    height={500}
                    alt={`${title} image`}
                /> */}
                <img src={img} />
            </CardContent>
            <CardFooter>
                {authors.length > 1 ? <ul>{authorsName}</ul> : <p>{authorsName}</p>}
            </CardFooter>
        </Card>
    );
}

export default BookCard;
