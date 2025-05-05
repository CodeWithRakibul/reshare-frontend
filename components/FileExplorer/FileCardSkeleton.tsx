import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function FileCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center px-4 py-3 border-b border-neutral-200", className)}>
            <div className="flex items-center flex-1">
                <div className="mr-2">
                    <Skeleton className="h-4 w-4 rounded" />
                </div>
                <div className="mr-3">
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
                <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-4 h-6 w-6 rounded-full" />
            <Skeleton className="ml-2 h-4 w-4" />
        </div>
    )
}
