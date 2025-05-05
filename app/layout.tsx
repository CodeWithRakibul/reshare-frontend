import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header/Header';
import { Toaster } from '@/components/ui/sonner';
import { ResponsiveSidebar } from '@/components/Sidebar/ResponsiveSidebar';
import { FileProvider } from '@/provider/FileContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Reshare - File Management',
    description: 'Modern file management and sharing platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <div className='flex w-full h-screen justify-between'>
                    <FileProvider>
                        <div className='md:w-[280px] relative z-50'>
                            <ResponsiveSidebar />
                        </div>
                        <div className='flex flex-col bg-white w-full md:w-[calc(100%-280px)]'>
                            <Header />
                            <main className='h-full'>{children}</main>
                        </div>
                    </FileProvider>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
