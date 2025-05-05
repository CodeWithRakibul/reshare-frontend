'use client';

import { useState, useRef, useEffect } from 'react';
import type { FileType } from '@/types/types';

export function useSearch(files: FileType[]) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null!);

    // Focus search input when search is opened
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Toggle search
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery('');
        }
    };

    // Filter files based on search query
    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        isSearchOpen,
        searchQuery,
        setSearchQuery,
        toggleSearch,
        filteredFiles,
        searchInputRef
    };
}
