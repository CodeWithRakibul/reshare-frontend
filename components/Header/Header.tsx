import { Breadcrumb } from './Breadcrumb';
import Search from './Search';
export default function Header() {
    return (
        <div className='p-3 sticky z-50 bg-white top-0 border-b flex items-center justify-between gap-3'>
            <div className='md:ml-0 ml-10'>
                <Breadcrumb showHome={false} />
            </div>
            <Search />
        </div>
    );
}
