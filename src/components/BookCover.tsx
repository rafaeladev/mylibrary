import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import Link from 'next/link.js';

import Image from 'next/image';

interface CardCompProps {
    id: number;
    img: string;
}

function BookCover({
    id,

    img,
}: CardCompProps) {
    return (
        <Card
            className='lg:max-w-md w-full bg-mc-white drop-shadow-std hover:bg-mc-beige transition-all'
            key={id}
        >
            <Link href={`/bibliotheque/${id}`}>
                <CardContent>
                    {/* <Image
                    src={img}
                    width={500}
                    height={500}
                    alt={`${title} image`}
                /> */}
                    <img src={img} />
                </CardContent>
            </Link>
        </Card>
    );
}

export default BookCover;
