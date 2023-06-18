'use client';
import { DetailUser } from '@/model/user';
import Link from 'next/link';
import PropagateLoader from 'react-spinners/PropagateLoader';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  // const users = data?.following;
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];

  return (
    <section className='flex items-center justify-center w-full p-4 mb-4 rounded-lg shadow-sm shadow-neutral-300 min-h-[90px] overflow-x-auto'>
      {loading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        (!users || users.length === 0) && <p>Not following anyone</p>
      )}
      {users && users.length > 0 && (
        <ul className='flex w-full gap-2'>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link
                className='flex flex-col items-center w-20'
                href={`/user/${username}`}
              >
                <Avatar image={image} highlight />
                <p className='w-full overflow-hidden text-sm text-center text-ellipsis'>
                  {username}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
