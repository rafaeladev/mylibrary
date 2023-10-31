import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={cn('max-auto w-full max-w-screen-xl px-6 md:px-40', className)}>
            {children}
        </div>
    );
}

export default MaxWidthWrapper;
