'use client';

import type React from 'react';

import { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './use-local-storage';
import type { FileType } from '@/types/types';
import { toast } from 'sonner';

const INITIAL_FILES: FileType[] = [
    { id: '1', name: 'AI', type: 'folder', date: 'May 27, 2025', section: 'all' },
    {
        id: '2',
        name: 'Key Account Plans.pdf',
        type: 'document',
        date: 'May 28, 2025',
        section: 'all'
    },
    { id: '3', name: 'Series B.docx', type: 'document', date: 'May 24, 2025', section: 'all' },
    { id: '4', name: 'Media Kit', type: 'folder', date: 'May 30, 2025', section: 'all' },
    { id: '5', name: 'Sales', type: 'folder', date: 'May 29, 2025', section: 'all' },
    { id: '6', name: 'Investors', type: 'folder', date: 'May 28, 2025', section: 'all' },
    {
        id: '7',
        name: 'Sales Playbook v3.1.pdf',
        type: 'document',
        date: 'May 25, 2025',
        section: 'all'
    },
    { id: '8', name: 'Product Demo.mp4', type: 'video', date: 'May 27, 2025', section: 'all' },
    { id: '9', name: 'Logo.png', type: 'image', date: 'May 26, 2025', section: 'all' },
    { id: '10', name: 'Website.html', type: 'other', date: 'May 24, 2025', section: 'all' }
];

export function useFiles() {
    // Files state
    const [files, setFiles] = useLocalStorage<FileType[]>('fileExplorerFiles', INITIAL_FILES);
    const [recentlyVisited, setRecentlyVisited] = useLocalStorage<FileType[]>(
        'recentlyVisitedFiles',
        INITIAL_FILES.slice(0, 3)
    );

    // Loading states
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [loadingFileIds, setLoadingFileIds] = useState<Set<string>>(new Set());

    // File selection state
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [checkedFiles, setCheckedFiles] = useState<Set<string>>(new Set());

    // Simulate initial loading from local storage
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1000); // Simulate 1 second loading time

        return () => clearTimeout(timer);
    }, []);

    // Determine file type based on extension
    const getFileType = useCallback(
        (fileName: string): 'folder' | 'document' | 'image' | 'video' | 'other' => {
            if (!fileName.includes('.')) return 'folder';

            const extension = fileName.split('.').pop()?.toLowerCase() || '';

            if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
                return 'image';
            } else if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
                return 'video';
            } else if (
                ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)
            ) {
                return 'document';
            } else {
                return 'other';
            }
        },
        []
    );

    // Handle file selection
    const handleFileSelect = useCallback(
        (id: string, e?: React.MouseEvent) => {
            if (e) {
                e.stopPropagation();
            }

            // Update recently visited files
            if (id !== selectedFile) {
                const selectedFileData = files.find((file) => file.id === id);
                if (selectedFileData) {
                    // Add to recently visited (max 3)
                    const updatedRecentlyVisited = [
                        selectedFileData,
                        ...recentlyVisited.filter((file) => file.id !== id)
                    ].slice(0, 3);

                    setRecentlyVisited(updatedRecentlyVisited);
                }
            }

            setSelectedFile(id === selectedFile ? null : id);
        },
        [files, recentlyVisited, selectedFile, setRecentlyVisited]
    );

    // Handle checkbox toggle
    const handleCheckboxToggle = useCallback((id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setCheckedFiles((prev) => {
            const newChecked = new Set(prev);
            if (newChecked.has(id)) {
                newChecked.delete(id);
            } else {
                newChecked.add(id);
            }
            return newChecked;
        });
    }, []);

    // Create new folder with loading state
    const createFolder = useCallback(
        (folderName: string) => {
            if (!folderName.trim()) return false;

            const newFolderId = `folder-${Date.now()}`;

            // Add to loading state
            setLoadingFileIds((prev) => {
                const newSet = new Set(prev);
                newSet.add(newFolderId);
                return newSet;
            });

            const newFolder: FileType = {
                id: newFolderId,
                name: folderName,
                type: 'folder',
                date: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                section: 'all'
            };

            // Simulate folder creation delay
            setTimeout(() => {
                setFiles((prev) => [newFolder, ...prev]);

                // Remove from loading state
                setLoadingFileIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(newFolderId);
                    return newSet;
                });

                toast.success('Folder created', {
                    description: `Folder "${folderName}" has been created.`,
                    descriptionClassName: '!text-gray-600'
                });
            }, 800);

            return true;
        },
        [setFiles]
    );

    // Add files with loading state
    const addFiles = useCallback(
        (newFiles: FileType[]) => {
            // Add all new file IDs to loading state
            setLoadingFileIds((prev) => {
                const newSet = new Set(prev);
                newFiles.forEach((file) => newSet.add(file.id));
                return newSet;
            });

            // Simulate file upload delay
            setTimeout(() => {
                setFiles((prev) => [...newFiles, ...prev]);

                // Remove from loading state
                setLoadingFileIds((prev) => {
                    const newSet = new Set(prev);
                    newFiles.forEach((file) => newSet.delete(file.id));
                    return newSet;
                });
            }, 1000);
        },
        [setFiles]
    );

    // Delete selected files
    const deleteSelectedFiles = useCallback(() => {
        if (checkedFiles.size === 0) return;

        const filesToDelete = Array.from(checkedFiles);

        // Remove from files
        setFiles((prev) => prev.filter((file) => !checkedFiles.has(file.id)));

        // Remove from recently visited
        setRecentlyVisited((prev) => prev.filter((file) => !checkedFiles.has(file.id)));

        // Clear selection
        setCheckedFiles(new Set());
        setSelectedFile(null);

        // Show toast
        toast('Files deleted', {
            description: `${filesToDelete.length} item${
                filesToDelete.length > 1 ? 's' : ''
            } deleted successfully.`
        });
    }, [checkedFiles, setFiles, setRecentlyVisited]);

    // Get file icon based on type
    const getFileIcon = useCallback((fileType: string) => {
        switch (fileType) {
            case 'folder':
                return 'folder';
            case 'image':
                return 'image';
            case 'video':
                return 'video';
            case 'document':
                return 'document';
            case 'other':
                return 'other';
            default:
                return 'file';
        }
    }, []);

    // Generate a consistent avatar for a file
    const getAvatarInfo = useCallback((fileName: string) => {
        // Create a simple hash of the filename for consistent colors
        let hash = 0;
        for (let i = 0; i < fileName.length; i++) {
            hash = fileName.charCodeAt(i) + ((hash << 5) - hash);
        }

        // Generate a style collection
        const styles = [
            'adventurer',
            'adventurer-neutral',
            'avataaars',
            'big-ears',
            'bottts',
            'croodles',
            'fun-emoji',
            'icons',
            'identicon',
            'initials',
            'lorelei',
            'micah',
            'miniavs',
            'open-peeps',
            'personas',
            'pixel-art'
        ];

        // Use the hash to pick a consistent style for this file
        const styleIndex = Math.abs(hash) % styles.length;
        return {
            style: styles[styleIndex],
            seed: fileName
        };
    }, []);

    return {
        files,
        recentlyVisited,
        selectedFile,
        checkedFiles,
        isInitialLoading,
        loadingFileIds,
        getFileType,
        handleFileSelect,
        handleCheckboxToggle,
        createFolder,
        addFiles,
        deleteSelectedFiles,
        getFileIcon,
        getAvatarInfo
    };
}
