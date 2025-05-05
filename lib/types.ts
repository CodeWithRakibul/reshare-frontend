import { StaticImageData } from 'next/image';

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
