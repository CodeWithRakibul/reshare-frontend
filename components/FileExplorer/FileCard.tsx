'use client';

import type React from 'react';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FileType, AvatarInfo } from '@/types/types';
import { FileIcon } from './FileIcon';

interface FileCardProps {
    file: FileType;
    selectedFile: string | null;
    checkedFiles: Set<string>;
    handleFileSelect: (id: string, e: React.MouseEvent) => void;
    handleCheckboxToggle: (id: string, e: React.MouseEvent) => void;
    getAvatarInfo: (fileName: string) => AvatarInfo;
}

function FileCardComponent({
    file,
    checkedFiles,
    handleCheckboxToggle,
    handleFileSelect,
    selectedFile,
    getAvatarInfo
}: FileCardProps) {
    const { style, seed } = getAvatarInfo(file.name);

    return (
        <div
            className={cn(
                'flex items-center px-4 py-3 hover:bg-zinc-100 cursor-pointer relative group border-b border-neutral-200',
                selectedFile === file.id && 'bg-zinc-100',
                checkedFiles.has(file.id) && 'bg-zinc-100'
            )}
            onClick={(e) => handleFileSelect(file.id, e)}
        >
            <div className='flex items-center flex-1'>
                <div
                    className={cn(
                        'mr-2',
                        checkedFiles.has(file.id)
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                    )}
                >
                    <Checkbox
                        checked={checkedFiles.has(file.id)}
                        onClick={(e) => handleCheckboxToggle(file.id, e as React.MouseEvent)}
                        className='bg-white border border-gray-300 cursor-pointer'
                    />
                </div>
                <div className='mr-3'>
                    <FileIcon type={file.type} />
                </div>
                <span className='font-medium group-hover:underline truncate'>{file.name}</span>
            </div>
            <div className='text-gray-500 sm:block hidden'>{file.date}</div>
            <Avatar className='ml-4 w-6 h-6'>
                <AvatarImage
                    src={`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`}
                    alt={`Avatar for ${file.name}`}
                />
                <AvatarFallback>{file.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <ChevronRight
                size={16}
                className={cn(
                    'ml-2 text-gray-400 transition-opacity',
                    selectedFile === file.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
            />
        </div>
    );
}

// Memoize the component for better performance
export const FileCard = memo(FileCardComponent);
