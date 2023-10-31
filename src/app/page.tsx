import Link from 'next/link.js';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import { Book } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';

import Login from '@/components/Login';
import Logout from '@/components/Logout';
import { getAuthSession } from '@/lib/nextauth';

export default async function Home() {
    const session = await getAuthSession();
    console.log(session);
    return (
        <MaxWidthWrapper className='mn-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
            <div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
                <p className='text-sm font-semibold text-gray-700'>My Library</p>
            </div>
            <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>My Library</h1>

            <Link
                className={buttonVariants({ size: 'lg', className: 'mt-5' })}
                href='/dashboard'
                target='_blank'
            >
                Home <Book className='ml-2 h-5 w-5' />
            </Link>
            {/* {session ? <Logout /> : <Login />} */}
            <pre>{JSON.stringify(session)}</pre>
        </MaxWidthWrapper>
    );
}
