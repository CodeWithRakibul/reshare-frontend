'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CreateFolderDialog } from './CreateFolderDialog';
import { useFiles } from '@/hooks/use-files';
import { useUpload } from '@/hooks/use-upload';
import { useSearch } from '@/hooks/use-search';
import { FileList } from './FileList';
import { UploadDialog } from './UploadDialog';
import Heading from '../Heading';
import { FileCard } from './FileCard';
import { FileCardSkeleton } from './FileCardSkeleton';
import { Toolbar } from './toolbar';

export default function FileExplorer() {
    const {
        files,
        recentlyVisited,
        selectedFile,
        checkedFiles,
        getFileType,
        handleFileSelect,
        handleCheckboxToggle,
        createFolder,
        addFiles,
        deleteSelectedFiles,
        getAvatarInfo,
        isInitialLoading,
        loadingFileIds
    } = useFiles();

    const {
        isSearchOpen,
        searchQuery,
        setSearchQuery,
        toggleSearch,
        filteredFiles,
        searchInputRef
    } = useSearch(files);
    const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
    const explorerRef = useRef<HTMLDivElement>(null);

    const {
        isUploadOpen,
        setIsUploadOpen,
        uploadProgress,
        isUploading,
        uploadSuccess,
        fileInputRef,
        dropZoneRef,
        handleFileUpload,
        processUpload
    } = useUpload(getFileType, addFiles);

    // Setup drag and drop for the entire explorer
    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (explorerRef.current) {
                explorerRef.current.classList.add('bg-blue-50', 'border-blue-300');
            }
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (explorerRef.current) {
                explorerRef.current.classList.remove('bg-blue-50', 'border-blue-300');
            }
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            if (explorerRef.current) {
                explorerRef.current.classList.remove('bg-blue-50', 'border-blue-300');
            }

            if (e.dataTransfer?.files) {
                processUpload(e.dataTransfer.files);
            }
        };

        const explorer = explorerRef.current;
        if (explorer) {
            explorer.addEventListener('dragover', handleDragOver);
            explorer.addEventListener('dragleave', handleDragLeave);
            explorer.addEventListener('drop', handleDrop);
        }

        return () => {
            if (explorer) {
                explorer.removeEventListener('dragover', handleDragOver);
                explorer.removeEventListener('dragleave', handleDragLeave);
                explorer.removeEventListener('drop', handleDrop);
            }
        };
    }, [processUpload]);

    return (
        <div ref={explorerRef} className={cn('transition-all duration-300 ease-in-out')}>
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
                                        onUploadClick={() => setIsUploadOpen(true)}
                                        onCreateFolderClick={() => setIsFolderDialogOpen(true)}
                                        checkedFiles={checkedFiles}
                                        deleteSelectedFiles={deleteSelectedFiles}
                                    />
                                </div>

                                {!searchQuery &&
                                    recentlyVisited.map((file, index) => (
                                        <FileCard
                                            key={`${file.id}-${index}`}
                                            file={file}
                                            selectedFile={selectedFile}
                                            checkedFiles={checkedFiles}
                                            handleFileSelect={handleFileSelect}
                                            handleCheckboxToggle={handleCheckboxToggle}
                                            getAvatarInfo={getAvatarInfo}
                                        />
                                    ))}
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

            {/* Hidden file input */}
            <input
                type='file'
                ref={fileInputRef}
                className='hidden'
                multiple
                onChange={(e) => processUpload(e.target.files)}
            />

            {/* Upload Dialog */}
            <UploadDialog
                isOpen={isUploadOpen}
                onOpenChange={setIsUploadOpen}
                isUploading={isUploading}
                uploadSuccess={uploadSuccess}
                uploadProgress={uploadProgress}
                dropZoneRef={dropZoneRef}
                onUploadClick={handleFileUpload}
                onDrop={(e) => processUpload(e.dataTransfer.files)}
            />

            {/* Create Folder Dialog */}
            <CreateFolderDialog
                isOpen={isFolderDialogOpen}
                onOpenChange={setIsFolderDialogOpen}
                onCreateFolder={createFolder}
            />
        </div>
    );
}
