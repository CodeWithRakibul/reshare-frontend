import Image, { StaticImageData } from 'next/image';

const UserImage = ({ path }: { path: string | StaticImageData }) => {
    return <Image src={path} alt='User Image' width={20} height={20} className='rounded-full' />;
};

export default UserImage;
