'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BookShelves from '@/components/bookShelves/BookShelves';
import Filter from '@/components/filter/Filter';
import { useState } from 'react';

const Page = () => {
    const [filterBy, setFilterBy] = useState('');
    return (
        <MaxWidthWrapper>
            <div>
                <h1>Bibliotheque</h1>
                <div>
                    <Filter
                        filterBy={filterBy}
                        setFilterBy={setFilterBy}
                    />
                    <BookShelves filterBy={filterBy} />
                </div>
            </div>
        </MaxWidthWrapper>
    );
};

export default Page;
