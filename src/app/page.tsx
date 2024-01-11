'use client';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import BookShelves from '@/components/bookShelves/BookShelves';
import Filter from '@/components/filter/Filter';
import { useState } from 'react';

const Page = () => {
    // const [filterBy, setFilterBy] = useState<string>('');
    const [APIResponse, setAPIResponse] = useState<number[]>([]);
    return (
        <MaxWidthWrapper>
            <h1>Bibliotheque</h1>
            <div className='flex justify-center gap-2'>
                <Filter
                    // filterBy={filterBy}
                    // setFilterBy={setFilterBy}
                    APIResponse={APIResponse}
                    setAPIResponse={setAPIResponse}
                />
            </div>
            <BookShelves APIResponse={APIResponse} />
        </MaxWidthWrapper>
    );
};

export default Page;
