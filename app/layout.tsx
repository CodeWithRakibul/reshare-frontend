import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Reshare - File Management',
    description: 'Modern file management and sharing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <div className='flex h-screen w-full'>
                    <Sidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}
