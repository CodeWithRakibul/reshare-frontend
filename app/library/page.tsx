import FileExplorer from '@/components/FileExplorer/FileExplorer';

export const metadata = {
    title: 'Library - File Management',
    description: 'Library page for file management system'
};

export default function LibraryPage() {
    return (
        <div className='px-10 py-5'>
            <FileExplorer />
        </div>
    );
}
