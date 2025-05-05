'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { FileType } from '@/types/types';
import { toast } from 'sonner';

export function useUpload(
    getFileType: (fileName: string) => FileType['type'],
    onFilesUploaded: (files: FileType[]) => void
) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState<FileType[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null!);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, []);

    // Process file upload
    const processUpload = useCallback(
        (files: FileList | null) => {
            if (!files || files.length === 0) return;

            setIsUploading(true);
            setUploadProgress(0);
            setIsUploadOpen(true);
            setUploadSuccess(false);
            setCurrentFileIndex(0);
            setTotalFiles(files.length);

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
                section: 'all' as const,
                size: file.size
            }));

            setUploadedFiles(newFiles);

            // Add files to the list immediately (they will be in loading state)
            onFilesUploaded(newFiles);

            // Clear any existing interval
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }

            // Constants for timing
            const totalDuration = 2000; // 2 seconds in milliseconds
            const updateInterval = 50; // Update every 50ms for smooth progress
            const totalSteps = totalDuration / updateInterval;
            const progressPerStep = 100 / totalSteps;

            let step = 0;

            // Start the progress timer
            progressIntervalRef.current = setInterval(() => {
                step++;

                // Calculate progress based on current step
                const currentProgress = Math.min(Math.round(step * progressPerStep), 99);
                setUploadProgress(currentProgress);

                // If we're at the last step, complete the upload
                if (step >= totalSteps) {
                    if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current);
                    }

                    // Set to 100% complete
                    setUploadProgress(100);
                    setIsUploading(false);
                    setUploadSuccess(true);

                    // Show success toast
                    toast.success('Upload complete', {
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
                        setCurrentFileIndex(0);
                        setTotalFiles(0);
                    }, 1500);
                }

                // Update file index for multi-file uploads to show progress
                // This is just for visual feedback since we're completing everything in 2 seconds
                if (files.length > 1) {
                    const fileIndexBasedOnProgress = Math.min(
                        Math.floor((currentProgress / 100) * files.length),
                        files.length - 1
                    );

                    if (fileIndexBasedOnProgress !== currentFileIndex) {
                        setCurrentFileIndex(fileIndexBasedOnProgress);
                    }
                }
            }, updateInterval);
        },
        [getFileType, onFilesUploaded, currentFileIndex]
    );

    // Cancel upload
    const cancelUpload = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        setIsUploading(false);
        setUploadProgress(0);
        setIsUploadOpen(false);
        setUploadSuccess(false);
        setCurrentFileIndex(0);
        setTotalFiles(0);

        toast.info('Upload cancelled', {
            description: 'The file upload was cancelled.'
        });
    }, []);

    return {
        isUploadOpen,
        setIsUploadOpen,
        uploadProgress,
        isUploading,
        uploadSuccess,
        fileInputRef,
        dropZoneRef,
        processUpload,
        cancelUpload,
        currentFileIndex,
        totalFiles,
        uploadedFiles,
        currentFileName: uploadedFiles[currentFileIndex]?.name || ''
    };
}
