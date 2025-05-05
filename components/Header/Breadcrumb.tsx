'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Breadcrumb as BreadcrumbUI,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface BreadcrumbSegment {
    label: string;
    href: string;
    isLast: boolean;
}

export function Breadcrumb({
    maxItems = 4,
    showHome = true
}: {
    maxItems?: number;
    showHome?: boolean;
}) {
    const pathname = usePathname();
    const [segments, setSegments] = useState<BreadcrumbSegment[]>([]);

    useEffect(() => {
        // Process the pathname to create breadcrumb segments
        const pathSegments = pathname.split('/').filter((segment) => segment !== '');

        // Create breadcrumb segments with proper labels and hrefs
        const breadcrumbSegments = pathSegments.map((segment, index) => {
            // Create the href for this segment (all segments up to this point)
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

            // Format the label (capitalize and replace hyphens with spaces)
            const label = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

            return {
                label,
                href,
                isLast: index === pathSegments.length - 1
            };
        });

        // Add home as the first segment if showHome is true
        const allSegments = showHome
            ? [
                  { label: 'Home', href: '/', isLast: pathSegments.length === 0 },
                  ...breadcrumbSegments
              ]
            : breadcrumbSegments;

        setSegments(allSegments);
    }, [pathname, showHome]);

    // If we have more segments than maxItems, we need to show the ellipsis
    const showEllipsis = segments.length > maxItems;

    // Determine which segments to show
    const visibleSegments = showEllipsis
        ? [
              segments[0], // Always show Home
              ...segments.slice(segments.length - (maxItems - 2)) // Show the last (maxItems - 2) segments
          ]
        : segments;

    // Determine which segments to hide in the dropdown
    const hiddenSegments = showEllipsis ? segments.slice(1, segments.length - (maxItems - 2)) : [];

    // Find the index where we need to insert the ellipsis
    const ellipsisIndex = showEllipsis ? 1 : -1;

    return (
        <BreadcrumbUI>
            <BreadcrumbList>
                {visibleSegments.map((segment, index) => {
                    // Insert the ellipsis dropdown after the first visible segment if needed
                    const shouldInsertEllipsis = index === ellipsisIndex && showEllipsis;

                    return (
                        <div key={segment.href} className='flex items-center p-2'>
                            <BreadcrumbItem className='text-foreground text-[13px] font-normal leading-5'>
                                {segment.isLast ? (
                                    <BreadcrumbPage>{segment.label}</BreadcrumbPage>
                                ) : (
                                    <Link href={segment.href}>{segment.label}</Link>
                                )}
                            </BreadcrumbItem>

                            {/* Insert ellipsis dropdown if needed */}
                            {shouldInsertEllipsis && (
                                <>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className='flex items-center gap-1'>
                                                <BreadcrumbEllipsis className='h-4 w-4' />
                                                <span className='sr-only'>Toggle menu</span>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='start'>
                                                {hiddenSegments.map((hiddenSegment) => (
                                                    <DropdownMenuItem
                                                        key={hiddenSegment.href}
                                                        asChild
                                                    >
                                                        <Link href={hiddenSegment.href}>
                                                            {hiddenSegment.label}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </BreadcrumbItem>
                                </>
                            )}

                            {/* Add separator if not the last item */}
                            {index < visibleSegments.length - 1 && <BreadcrumbSeparator />}
                        </div>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbUI>
    );
}
