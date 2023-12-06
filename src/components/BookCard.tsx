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
    authors: [];
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
                    <p>
                        Type :<span>{type}</span>
                    </p>
                    <p>
                        Catégorie : <span>{category}</span>
                    </p>

                    <p>
                        Status : <span>{status}</span>
                    </p>
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
                <p>{authors}</p>
            </CardFooter>
        </Card>
    );
}

export default BookCard;
