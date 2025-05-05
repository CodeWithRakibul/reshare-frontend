'use client';

import { useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { UploadDialog } from './UploadDialog';
import { useUpload } from '@/hooks/use-upload';
import { useFileContext } from '@/provider/FileContext';

interface UploadFileProps {
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

export default function UploadFile({ size = 'sm' }: UploadFileProps) {
    const explorerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null!);

    // Get functions from context
    const { getFileType, addFiles } = useFileContext();

    // Use the custom hook for upload functionality
    const {
        isUploadOpen,
        setIsUploadOpen,
        uploadProgress,
        isUploading,
        uploadSuccess,
        processUpload
    } = useUpload(getFileType, addFiles);

    // Handle file upload button click
    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

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
        <>
            <Button size={size} variant='default' onClick={() => setIsUploadOpen(true)}>
                <Plus className='text-neutral-400' size={16} />
                <span className='hidden sm:block'>Upload</span>
            </Button>
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
        </>
    );
}
