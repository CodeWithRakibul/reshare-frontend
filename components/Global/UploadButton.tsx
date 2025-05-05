import { Button, type VariantProps } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

interface UploadButtonProps {
    variant?: VariantProps<typeof Button>['variant'];
    size?: VariantProps<typeof Button>['size'];
}

export function UploadButton({ variant = 'default', size = 'sm' }: UploadButtonProps) {
    return (
        <Button size={size} variant={variant} className='gap-3.5 text-sm group cursor-pointer'>
            <PlusIcon className='text-[#999999] group-hover:text-accent' />
            <span>Upload</span>
        </Button>
    );
}
