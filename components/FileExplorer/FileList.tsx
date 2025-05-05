import type React from 'react';
import { memo } from 'react';
import { FileCardSkeleton } from './FileCardSkeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { FileType, AvatarInfo } from '@/types/types';
import Heading from '../Heading';
import { FileCard } from './FileCard';

interface FileListProps {
    title: string;
    files: FileType[];
    selectedFile: string | null;
    checkedFiles: Set<string>;
    handleFileSelect: (id: string, e: React.MouseEvent) => void;
    handleCheckboxToggle: (id: string, e: React.MouseEvent) => void;
    getAvatarInfo: (fileName: string) => AvatarInfo;
    emptyMessage?: string;
    isInitialLoading?: boolean;
    loadingFileIds?: Set<string>;
}

function FileListComponent({
    title,
    files,
    selectedFile,
    checkedFiles,
    handleFileSelect,
    handleCheckboxToggle,
    getAvatarInfo,
    emptyMessage = 'No files found.',
    isInitialLoading = false,
    loadingFileIds = new Set()
}: FileListProps) {
    // If initial loading, show skeleton for all files
    if (isInitialLoading) {
        return (
            <div>
                <div className='px-4 py-2'>
                    <Heading>{title}</Heading>
                </div>
                {Array.from({ length: title === 'Recently visited' ? 3 : 10 }).map((_, index) => (
                    <FileCardSkeleton key={`skeleton-${title}-${index}`} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className='px-4 py-2'>
                <Heading>{title}</Heading>
            </div>

            {files.length > 0 ? (
                files.map((file) => {
                    // If this specific file is loading, show skeleton
                    if (loadingFileIds.has(file.id)) {
                        return <FileCardSkeleton key={`loading-${file.id}`} />;
                    }

                    // Otherwise show the normal file card
                    return (
                        <FileCard
                            key={`${title}-${file.id}`}
                            file={file}
                            selectedFile={selectedFile}
                            checkedFiles={checkedFiles}
                            handleFileSelect={handleFileSelect}
                            handleCheckboxToggle={handleCheckboxToggle}
                            getAvatarInfo={getAvatarInfo}
                        />
                    );
                })
            ) : (
                <Alert className='mx-4 my-2'>
                    <AlertDescription>{emptyMessage}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}

// Memoize the component for better performance
export const FileList = memo(FileListComponent);
