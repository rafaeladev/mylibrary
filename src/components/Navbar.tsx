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
        <nav className='fixed w-22 inset-y-0 top-0 z-30 h-full border-r boder-gray-200 bg-white/75 backdrop-blur-lg transition-all p-2'>
            {/* <MaxWidthWrapper> */}
            <div className='flex w-22 items-center justify-center'>
                <Link
                    href='/'
                    className='flex z-40 font-semibold text-center'
                >
                    <span>LB</span>
                </Link>
                {/* todo : add mobile navbar */}
            </div>
            <div className='flex flex-col justify-items-start align-middle'>
                <>
                    <Link
                        href='/Library'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Library
                    </Link>
                    {session && (
                        <Link
                            href='/create'
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                        >
                            Create
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
