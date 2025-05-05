import { Button } from '@/components/ui/button';

interface UploadButtonProps {
    variant?: 'default' | 'secondary';
}

export function UploadButton({ variant = 'default' }: UploadButtonProps) {
    return (
        <Button variant={variant} className='w-full gap-2 group'>
            <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='group-hover:translate-y-[-2px] transition-transform'
            >
                <path
                    d='M12 5V19M19 12L12 5L5 12'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
            Upload
        </Button>
    );
}
