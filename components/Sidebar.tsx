import Link from 'next/link';
import { UploadButton } from './UploadButton';
import logo from '../public/assets/Logo.svg';
import Image from 'next/image';
import UserImage from './UserImage';
import { sidebarItems, sidebarSettings, user } from '@/lib/data';

export function Sidebar() {
    return (
        <div className='w-[280px] sticky border-r border-border bg-sidebar hidden md:flex flex-col h-screen p-3'>
            <div className='p-1 pb-4'>
                <Link href='/' className='flex items-center gap-2'>
                    <Image src={logo} alt='Logo' width={72} height={32} />
                </Link>
            </div>

            <div className='mb-3'>
                <UploadButton variant='default' size={'lg'} />
            </div>

            <nav>
                {sidebarItems.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className='flex items-center p-2 rounded-lg text-foreground hover:bg-sidebar-accent hover:backdrop-blur-sm hover:text-accent-foreground transition-colors'
                    >
                        <span className='flex gap-2 items-center'>
                            <span className='size-5 flex items-center justify-center'>
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={16}
                                    height={16}
                                    className='text-foreground'
                                />
                            </span>

                            <span className='text-[13px] font-normal leading-5'>{item.title}</span>
                        </span>
                    </Link>
                ))}
            </nav>

            <div className='mt-auto'>
                {sidebarSettings.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className='flex items-center p-2 rounded-lg text-[13px] font-normal leading-5 text-foreground hover:bg-sidebar-accent hover:backdrop-blur-sm hover:text-accent-foreground transition-colors'
                    >
                        <span className='flex gap-2 items-center'>
                            <span className='size-5 flex items-center justify-center'>
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={16}
                                    height={16}
                                    className='text-foreground'
                                />
                            </span>

                            <span className='text-[13px] font-normal leading-5'>{item.title}</span>
                        </span>
                    </Link>
                ))}
                <Link
                    href='/profile'
                    className='flex p-2 gap-2 items-center rounded-lg text-[13px] font-normal leading-5 text-foreground hover:bg-sidebar-accent hover:backdrop-blur-sm hover:text-accent-foreground transition-colors'
                >
                    <UserImage path={user.image} />
                    <span>Marcielle Enrique</span>
                </Link>
            </div>
        </div>
    );
}
