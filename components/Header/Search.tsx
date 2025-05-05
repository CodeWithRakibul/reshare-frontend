import Image from 'next/image';
import searchIcon from '../../public/assets/search.svg';
import { Input } from '../ui/input';

export default function Search() {
    return (
        <div className='relative bg-zinc-100 rounded-lg backdrop-blur-sm inline-flex justify-start items-center gap-2 min-w-60'>
            <Image
                className='absolute z-10 left-0 m-2'
                src={searchIcon}
                alt='Search Icon'
                width={20}
                height={20}
            />
            <Input
                className='h-9 p-2 pl-9 flex-1 items-center bg-sidebar justify-center text-foreground placeholder:text-foreground text-[13px] font-normal leading-9'
                placeholder='Search in Reshare...'
                type='search'
            />
        </div>
    );
}
