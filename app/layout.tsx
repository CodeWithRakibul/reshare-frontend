import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Reshare - File Management',
    description: 'Modern file management and sharing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <div className='flex w-full'>
                    <Sidebar />
                    <div className='flex-1 bg-white'>
                        <Header />
                        {children}
                    </div>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
