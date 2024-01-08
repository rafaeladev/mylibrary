import Link from 'next/link.js';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { getAuthSession } from '@/lib/nextauth';
import { useSession } from 'next-auth/react';
import Login from './Login';
import Logout from './Logout';

export default async function Navbar() {
    const session = await getAuthSession();
    return (
        <footer className='fixed w-full inset-x-0 bottom-0 z-30 h-22 border-r boder-gray-200 bg-mc-beige backdrop-blur-lg transition-all p-2 text-mc-violet'>
            {/* <MaxWidthWrapper> */}
            <div className='flex w-full  justify-center align-middle '>
                <p>
                    Designed by
                    <Link
                        href='/bibliotheque'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Rafaela
                    </Link>
                    @2023
                </p>
            </div>
            {/* </MaxWidthWrapper> */}
        </footer>
    );
}
