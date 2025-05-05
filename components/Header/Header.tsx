import { Breadcrumb } from './Breadcrumb';
import Search from './Search';
export default function Header() {
    return (
        <div className='p-3 border-b flex items-center justify-between gap-3'>
            <Breadcrumb showHome={false} />
            <Search />
        </div>
    );
}
