import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div
            className={cn('mx-auto max-auto w-full max-w-screen-xl px-6 py-40 md:px-10', className)}
        >
            {children}
        </div>
    );
}

export default MaxWidthWrapper;
