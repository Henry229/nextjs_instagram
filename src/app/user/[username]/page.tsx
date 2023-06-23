import { getUserForProfile } from '@/service/user';
import NotFound from './not-found';
import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';
import { Metadata } from 'next';
import { cache } from 'react';

type Props = {
  params: { username: string };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭(posts, liked, bookmarks)
  // 아래 보면 getUserForProfile 함수가 2번 호출되는데 렌더링되는 사이트내에서 1번만 호출하려면 cache를 사용해야함.

  // const user = await getUserForProfile(username); cache를 사용하는 getUser로 바꾼다.
  const user = await getUser(username);
  if (!user) {
    NotFound();
  }
  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  // const user = await getUserForProfile(username);
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) • Instantgram photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
