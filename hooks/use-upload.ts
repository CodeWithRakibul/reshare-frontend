'use client';

import { useState, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import type { FileType } from '@/types/types';

export function useUpload(
    getFileType: (fileName: string) => FileType['type'],
    onFilesUploaded: (files: FileType[]) => void
) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null!);

    // Handle file upload
    const handleFileUpload = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    // Process file upload
    const processUpload = useCallback(
        (files: FileList | null) => {
            if (!files || files.length === 0) return;

            setIsUploading(true);
            setUploadProgress(0);
            setIsUploadOpen(true);
            setUploadSuccess(false);

            // Create file objects immediately to show in UI with loading state
            const newFiles = Array.from(files).map((file, index) => ({
                id: `new-${Date.now()}-${index}`,
                name: file.name,
                type: getFileType(file.name),
                date: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                section: 'all' as const
            }));

            // Add files to the list immediately (they will be in loading state)
            onFilesUploaded(newFiles);

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsUploading(false);
                        setUploadSuccess(true);

                        // Show success toast
                        toast.success('Upload successful', {
                            description: `${files.length} file${
                                files.length > 1 ? 's' : ''
                            } uploaded successfully.`,
                            descriptionClassName: '!text-gray-600'
                        });

                        // Close the dialog after a delay
                        setTimeout(() => {
                            setIsUploadOpen(false);
                            setUploadProgress(0);
                            setUploadSuccess(false);
                        }, 1500);

                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
        },
        [getFileType, onFilesUploaded]
    );

    return {
        isUploadOpen,
        setIsUploadOpen,
        uploadProgress,
        isUploading,
        uploadSuccess,
        fileInputRef,
        dropZoneRef,
        handleFileUpload,
        processUpload
    };
}
