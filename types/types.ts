import { StaticImageData } from 'next/image';

export interface FileType {
    id: string;
    name: string;
    type: 'folder' | 'document' | 'image' | 'video' | 'other';
    date: string;
    section: 'recent' | 'all';
}

export interface AvatarInfo {
    style: string;
    seed: string;
}

export interface User {
    id: string;
    name: string;
    initials: string;
    image: string | StaticImageData;
}

export interface SidebarItem {
    title: string;
    icon: string | StaticImageData;
    href: string;
}
