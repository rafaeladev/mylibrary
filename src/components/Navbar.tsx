import Link from 'next/link.js';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';

const Navbar = () => {
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
                    <Link
                        href='/Login'
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Login
                    </Link>
                </>
            </div>
            {/* </MaxWidthWrapper> */}
        </nav>
    );
};

export default Navbar;
