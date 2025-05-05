import Avatar from '../public/assets/Avatar.svg';
import folderIcon from '../public/assets/sidebar-icons/Folder.svg';
import shieldCheckIcon from '../public/assets/sidebar-icons/Shield-check.svg';
import userIcon from '../public/assets/sidebar-icons/User.svg';
import mailIcon from '../public/assets/sidebar-icons/Mail.svg';
import settingIcon from '../public/assets/sidebar-icons/Setting.svg';
import { SidebarItem, User } from '@/types/types';

export const user: User = {
    id: '1',
    name: 'Marcielle Enrique',
    initials: 'ME',
    image: Avatar
};

export const sidebarItems: SidebarItem[] = [
    {
        title: 'Library',
        icon: folderIcon,
        href: '/library'
    },
    {
        title: 'Data Rooms',
        icon: shieldCheckIcon,
        href: '/data-rooms'
    },
    {
        title: 'Visitors',
        icon: userIcon,
        href: '/visitors'
    }
];

export const sidebarSettings: SidebarItem[] = [
    {
        title: 'Invite',
        icon: mailIcon,
        href: '/invite'
    },
    {
        title: 'Settings',
        icon: settingIcon,
        href: '/settings'
    }
];
