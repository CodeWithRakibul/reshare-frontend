import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function FileCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('flex items-center p-3 border-b border-neutral-200', className)}>
            <div className='flex items-center gap-3 flex-1'>
                <div>
                    <Skeleton className='size-5 rounded' />
                </div>
                <div>
                    <Skeleton className='size-5 rounded' />
                </div>
                <Skeleton className='h-5 w-40' />
            </div>
            <div className='flex items-center gap-3'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='size-5 rounded-full' />
                <Skeleton className='h-4 w-4' />
            </div>
        </div>
    );
}
