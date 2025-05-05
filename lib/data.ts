import Avatar from '../public/assets/Avatar.svg';
import { StaticImageData } from 'next/image';

export interface User {
    id: string;
    name: string;
    initials: string;
    image: string | StaticImageData;
}

export const user: User = {
    id: '1',
    name: 'Marcielle Enrique',
    initials: 'ME',
    image: Avatar
};
