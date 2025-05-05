'use client';

import { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function ResponsiveSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when sidebar is open on mobile
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className='relative flex md:h-full h-[60px] items-center'>
            {/* Mobile Toggle Button */}
            <Button
                variant='default'
                size='sm'
                className={cn(
                    isOpen ? 'left-[235px] top-2 duration-500' : 'left-2',
                    'md:hidden fixed z-50 p-2 rounded-t-md cursor-pointer'
                )}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? <X size={16} /> : <Menu size={24} />}
            </Button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className='md:hidden fixed inset-0 bg-black/50 z-40'
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar - Important: removed the conditional transform */}
            <div
                className={`
          fixed md:sticky top-0 left-0 z-40 h-screen
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                {/* This ensures the sidebar is always rendered but only visible when open on mobile */}
                <div className={`w-[280px] h-full`}>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
