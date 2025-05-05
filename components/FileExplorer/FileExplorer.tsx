'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CreateFolderDialog } from './CreateFolderDialog';
import { useSearch } from '@/hooks/use-search';
import { FileList } from './FileList';
import Heading from '../Heading';
import { FileCard } from './FileCard';
import { FileCardSkeleton } from './FileCardSkeleton';
import { Toolbar } from './toolbar';
import { FileType } from '@/types/types';
import { useFileContext } from '@/provider/FileContext';

export default function FileExplorer() {
    const {
        files,
        recentlyVisited,
        selectedFile,
        checkedFiles,
        handleFileSelect,
        handleCheckboxToggle,
        createFolder,
        deleteSelectedFiles,
        getAvatarInfo,
        isInitialLoading,
        loadingFileIds
    } = useFileContext();

    const {
        isSearchOpen,
        searchQuery,
        setSearchQuery,
        toggleSearch,
        filteredFiles,
        searchInputRef
    } = useSearch(files);

    const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);

    return (
        <div className={cn('transition-all duration-300 ease-in-out')}>
            <div>
                {/* Recently visited section - only show when not searching */}
                {(recentlyVisited.length > 0 || isInitialLoading) && (
                    <>
                        {isInitialLoading ? (
                            <div>
                                <div className='pb-3'>
                                    <Heading>Recently visited</Heading>
                                </div>
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <FileCardSkeleton key={`skeleton--${index}`} />
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className='pb-3 flex items-center justify-between gap-3'>
                                    {searchQuery ? (
                                        <div></div>
                                    ) : (
                                        <Heading>Recently visited</Heading>
                                    )}
                                    <Toolbar
                                        isSearchOpen={isSearchOpen}
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        toggleSearch={toggleSearch}
                                        searchInputRef={searchInputRef}
                                        onCreateFolderClick={() => setIsFolderDialogOpen(true)}
                                        checkedFiles={checkedFiles}
                                        deleteSelectedFiles={deleteSelectedFiles}
                                    />
                                </div>

                                {!searchQuery &&
                                    recentlyVisited.map((file: FileType, index: number) => {
                                        return (
                                            <FileCard
                                                key={`${file.id}-${index}`}
                                                file={file}
                                                selectedFile={selectedFile}
                                                checkedFiles={checkedFiles}
                                                handleFileSelect={handleFileSelect}
                                                handleCheckboxToggle={handleCheckboxToggle}
                                                getAvatarInfo={getAvatarInfo}
                                                isLast={index === recentlyVisited.length - 1}
                                            />
                                        );
                                    })}
                            </>
                        )}
                    </>
                )}

                {/* All files section */}
                <FileList
                    title='All'
                    files={isSearchOpen ? filteredFiles : files}
                    selectedFile={selectedFile}
                    checkedFiles={checkedFiles}
                    handleFileSelect={handleFileSelect}
                    handleCheckboxToggle={handleCheckboxToggle}
                    getAvatarInfo={getAvatarInfo}
                    emptyMessage={
                        searchQuery
                            ? `No files found matching "${searchQuery}". Try a different search term.`
                            : 'No files found. Upload files or create a folder to get started.'
                    }
                    isInitialLoading={isInitialLoading}
                    loadingFileIds={loadingFileIds}
                />
            </div>

            {/* Create Folder Dialog */}
            <CreateFolderDialog
                isOpen={isFolderDialogOpen}
                onOpenChange={setIsFolderDialogOpen}
                onCreateFolder={createFolder}
            />
        </div>
    );
}
