import { getUserForProfile } from '@/service/user';
import NotFound from './not-found';
import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지와 정보(username, name, 숫자)
  // 하단: 3개의 탭(posts, liked, bookmarks)
  const user = await getUserForProfile(username);
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
