'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import type { FileType } from '@/types/types';
import { INITIAL_FILES } from '@/lib/initial-data';
import { toast } from 'sonner';

// Define the context type
type FileContextType = {
    files: FileType[];
    recentlyVisited: FileType[];
    selectedFile: string | null;
    checkedFiles: Set<string>;
    isInitialLoading: boolean;
    loadingFileIds: Set<string>;
    getFileType: (fileName: string) => 'folder' | 'document' | 'image' | 'video' | 'other';
    handleFileSelect: (id: string, e?: React.MouseEvent) => void;
    handleCheckboxToggle: (id: string, e: React.MouseEvent) => void;
    createFolder: (folderName: string) => boolean;
    addFiles: (newFiles: FileType[]) => void;
    deleteSelectedFiles: () => void;
    getFileIcon: (fileType: string) => string;
    refreshFiles: () => void;
};

// Create the context
const FileContext = createContext<FileContextType | undefined>(undefined);

// Create the provider component
export function FileProvider({ children }: { children: ReactNode }) {
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

    // Force re-render state
    const [_refreshCounter, setRefreshCounter] = useState(0);

    // Simulate initial loading from local storage
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1000); // Simulate 1 second loading time

        return () => clearTimeout(timer);
    }, []);

    // Listen for localStorage changes from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'fileExplorerFiles' && e.newValue) {
                try {
                    const newFiles = JSON.parse(e.newValue);
                    // Update files state without using setFiles to avoid writing back to localStorage
                    if (JSON.stringify(files) !== e.newValue) {
                        setFiles(newFiles);
                        setRefreshCounter((prev) => prev + 1);
                    }
                } catch (error) {
                    console.error('Error parsing localStorage data:', error);
                }
            } else if (e.key === 'recentlyVisitedFiles' && e.newValue) {
                try {
                    const newRecentlyVisited = JSON.parse(e.newValue);
                    if (JSON.stringify(recentlyVisited) !== e.newValue) {
                        setRecentlyVisited(newRecentlyVisited);
                    }
                } catch (error) {
                    console.error('Error parsing localStorage data:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [files, recentlyVisited, setFiles, setRecentlyVisited]);

    // Determine file type based on extension
    const getFileType = (fileName: string): 'folder' | 'document' | 'image' | 'video' | 'other' => {
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
    };

    // Handle file selection
    const handleFileSelect = (id: string, e?: React.MouseEvent) => {
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
    };

    // Handle checkbox toggle
    const handleCheckboxToggle = (id: string, e: React.MouseEvent) => {
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
    };

    // Create new folder with loading state
    const createFolder = (folderName: string) => {
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

        // Add folder to files immediately so it shows in UI with loading state
        setFiles((prev) => [newFolder, ...prev]);
        setRefreshCounter((prev) => prev + 1);

        // Simulate folder creation delay - only remove loading state after delay
        setTimeout(() => {
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
    };

    // Add files with loading state
    const addFiles = (newFiles: FileType[]) => {
        // Add all new file IDs to loading state
        setLoadingFileIds((prev) => {
            const newSet = new Set(prev);
            newFiles.forEach((file) => newSet.add(file.id));
            return newSet;
        });

        // Add files to state immediately so they show in UI with loading state
        setFiles((prev) => [...newFiles, ...prev]);
        setRefreshCounter((prev) => prev + 1);

        // Simulate file upload delay - only remove loading state after delay
        setTimeout(() => {
            // Remove from loading state
            setLoadingFileIds((prev) => {
                const newSet = new Set(prev);
                newFiles.forEach((file) => newSet.delete(file.id));
                return newSet;
            });

            // Show success toast
            if (newFiles.length > 0) {
                toast.success('Upload successful', {
                    description: `${newFiles.length} file${
                        newFiles.length > 1 ? 's' : ''
                    } uploaded successfully.`,
                    descriptionClassName: '!text-gray-600'
                });
            }
        }, 1000);
    };

    // Delete selected files
    const deleteSelectedFiles = () => {
        if (checkedFiles.size === 0) return;

        const filesToDelete = Array.from(checkedFiles);

        // Remove from files
        setFiles((prev) => prev.filter((file) => !checkedFiles.has(file.id)));

        // Remove from recently visited
        setRecentlyVisited((prev) => prev.filter((file) => !checkedFiles.has(file.id)));

        // Clear selection
        setCheckedFiles(new Set());
        setSelectedFile(null);
        setRefreshCounter((prev) => prev + 1);

        // Show toast
        toast('Files deleted', {
            description: `${filesToDelete.length} item${
                filesToDelete.length > 1 ? 's' : ''
            } deleted successfully.`
        });
    };

    // Get file icon based on type
    const getFileIcon = (fileType: string) => {
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
    };

    // Force a refresh of the files
    const refreshFiles = () => {
        setRefreshCounter((prev) => prev + 1);
    };

    // Create the context value
    const contextValue: FileContextType = {
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
        refreshFiles
    };

    return <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>;
}

// Create a hook to use the context
export function useFileContext() {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
}
