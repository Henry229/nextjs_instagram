import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');
  // const { mutate } = useSWRConfig();

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return;
    // const bookmarks = user?.bookmarks ?? []; // user가 있다면 bookmarks를 가져오고 없다면(이게 ??의 의미) 빈 배열을 가져온다
    const bookmarks = user.bookmarks; // user가 있다면 bookmarks를 가져오고 없다면(이게 ??의 의미) 빈 배열을 가져온다
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter((item) => item !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
    // fetch('api/likes', {
    //   method: 'PUT',
    //   body: JSON.stringify({ id: post.id, like }),
    // }).then(() => mutate('/api/posts'));
  };
  return { user, isLoading, error, setBookmark };
}
