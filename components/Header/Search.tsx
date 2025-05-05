import Image from 'next/image';
import searchIcon from '../../public/assets/search.svg';
import { Input } from '../ui/input';

export default function Search() {
    return (
        <div className='relative bg-zinc-100 rounded-lg backdrop-blur-sm inline-flex justify-start items-center gap-2 min-w-60'>
            <Image
                className='absolute left-2 top-2'
                src={searchIcon}
                alt='Search Icon'
                width={20}
                height={20}
            />
            <Input
                className="p-2 pl-8 flex-1 justify-start text-zinc-800 text-xs font-normal font-['Inter'] leading-tight"
                placeholder='Search in Reshare...'
                type='search'
            />
        </div>
    );
}
