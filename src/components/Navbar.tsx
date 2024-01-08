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
        <nav className='fixed w-full inset-x-0 top-0 z-30 h-22 border-r boder-gray-200 bg-mc-marrom backdrop-blur-lg transition-all p-2 text-mc-white'>
            {/* <MaxWidthWrapper> */}
            <div className='flex w-full items-center justify-center'>
                <Link
                    href='/'
                    className='flex z-40 font-semibold text-center text-2xl  font-serif'
                >
                    <span>Bibliela</span>
                </Link>
                {/* todo : add mobile navbar */}
            </div>
            <div className='flex w-full  justify-center align-middle '>
                <>
                    <Link
                        href='/bibliotheque'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        ACCUEIL
                    </Link>
                    <Link
                        href='/bibliotheque'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        BIBLIOTHEQUE
                    </Link>
                    <Link
                        href='/bibliotheque'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        ABOUT
                    </Link>
                    {session && (
                        <Link
                            href='/create'
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            ADD LIVRE
                        </Link>
                    )}

                    <div className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                        {session ? <Logout /> : <Login />}
                    </div>
                </>
            </div>
            {/* </MaxWidthWrapper> */}
        </nav>
    );
}
