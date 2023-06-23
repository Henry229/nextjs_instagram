import { SearchUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: SearchUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  return (
    <Link
      className='flex items-center w-full p-4 mb-2 bg-white border rounded-md border-neutral-300 hover:bg-neutral-50'
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className='ml-2 text-neutral-500'>
        {/* leading-4의 의미는 줄간격을 4로 한다는 뜻 */}
        <p className='font-bold leading-4 text-black'>{username}</p>
        <p>{name}</p>
        <p className='text-sm leading-4'>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
