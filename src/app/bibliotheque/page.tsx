'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BookShelves from '@/components/bookShelves/BookShelves';
import { useEffect } from 'react';

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <h1>Bibliotheque</h1>
                <BookShelves />
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
