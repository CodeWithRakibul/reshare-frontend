'use client';

import type React from 'react';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';
import { SelectedFilesBar } from './SelectedFilesBar';
import folderAddIcon from '../../public/assets/folder-add.svg';
import Image from 'next/image';
import UploadFile from './UploadFile';

interface ToolbarProps {
    isSearchOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    toggleSearch: () => void;
    searchInputRef: React.RefObject<HTMLInputElement>;
    onCreateFolderClick: () => void;
    deleteSelectedFiles: () => void;
    checkedFiles: Set<string>;
}

function ToolbarComponent({
    isSearchOpen,
    searchQuery,
    setSearchQuery,
    toggleSearch,
    searchInputRef,
    onCreateFolderClick,
    deleteSelectedFiles,
    checkedFiles
}: ToolbarProps) {
    return (
        <div className='flex items-center gap-2'>
            <SelectedFilesBar selectedCount={checkedFiles.size} onDelete={deleteSelectedFiles} />
            <SearchBar
                isSearchOpen={isSearchOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                toggleSearch={toggleSearch}
                searchInputRef={searchInputRef}
            />
            <Button variant='secondary' size='icon' onClick={onCreateFolderClick}>
                <Image src={folderAddIcon} alt='Folder Add Icon' width={20} height={20} />
            </Button>
            <UploadFile />
        </div>
    );
}

// Memoize the component for better performance
export const Toolbar = memo(ToolbarComponent);
