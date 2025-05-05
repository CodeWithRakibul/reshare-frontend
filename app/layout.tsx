import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';
import { ResponsiveSidebar } from '@/components/Sidebar/ResponsiveSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Reshare - File Management',
    description: 'Modern file management and sharing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <div className='flex w-full h-screen'>
                    <ResponsiveSidebar />
                    <div className='flex-1 flex flex-col bg-white'>
                        <Header />
                        <main className='flex-1'>{children}</main>
                    </div>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
