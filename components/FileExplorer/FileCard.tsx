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
                'flex items-center p-3 hover:bg-zinc-100 cursor-pointer relative group border-b border-neutral-200',
                selectedFile === file.id && 'bg-zinc-100',
                checkedFiles.has(file.id) && 'bg-zinc-100'
            )}
            onClick={(e) => handleFileSelect(file.id, e)}
        >
            <div className='flex items-center gap-3 flex-1'>
                <div
                    className={cn(
                        checkedFiles.has(file.id)
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                    )}
                >
                    <Checkbox
                        checked={checkedFiles.has(file.id)}
                        onClick={(e) => handleCheckboxToggle(file.id, e as React.MouseEvent)}
                        className='bg-white border size-5 border-gray-300 rounded-[6px] cursor-pointer flex items-center justify-center'
                    />
                </div>
                <FileIcon type={file.type} />
                <span className='text-foreground group-hover:underline text-[13px] font-normal leading-5'>
                    {file.name}
                </span>
            </div>
            <div className='flex items-center gap-3'>
                <div className='text-[#777777] text-[13px] font-normal leading-5'>{file.date}</div>
                <Avatar className='w-5 h-5'>
                    <AvatarImage
                        src={`https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`}
                        alt={`Avatar for ${file.name}`}
                    />
                    <AvatarFallback>{file.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className='size-5 flex items-center justify-center'>
                    <ChevronRight
                        size={16}
                        className={cn(
                            'text-[#999999] transition-opacity',
                            selectedFile === file.id
                                ? 'opacity-100'
                                : 'opacity-0 group-hover:opacity-100'
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

// Memoize the component for better performance
export const FileCard = memo(FileCardComponent);
