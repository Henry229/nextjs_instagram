import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: targetId, follow }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), { populateCache: false });
    },
    [mutate]
  );
  return { user, isLoading, error, setBookmark, toggleFollow };
}

// import { SimplePost } from '@/model/post';
// import { HomeUser } from '@/model/user';
// import { useCallback } from 'react';
// import useSWR from 'swr';

// async function updateBookmark(postId: string, bookmark: boolean) {
//   return fetch('/api/bookmarks', {
//     method: 'PUT',
//     body: JSON.stringify({ id: postId, bookmark }),
//   }).then((res) => res.json());
// }

// async function updateFollow(targetId: string, follow: boolean) {
//   return fetch('/api/follow', {
//     method: 'PUT',
//     body: JSON.stringify({ id: targetId, follow }),
//   }).then((res) => res.json());
// }

// export default function useMe() {
//   const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');
//   // const { mutate } = useSWRConfig();

//   const setBookmark = useCallback(
//     (postId: string, bookmark: boolean) => {
//       if (!user) return;
//       // const bookmarks = user?.bookmarks ?? []; // user가 있다면 bookmarks를 가져오고 없다면(이게 ??의 의미) 빈 배열을 가져온다
//       const bookmarks = user.bookmarks; // user가 있다면 bookmarks를 가져오고 없다면(이게 ??의 의미) 빈 배열을 가져온다
//       const newUser = {
//         ...user,
//         bookmarks: bookmark
//           ? [...bookmarks, postId]
//           : bookmarks.filter((item) => item !== postId),
//       };

//       return mutate(updateBookmark(postId, bookmark), {
//         optimisticData: newUser, // 변경된 사항이 즉각적으로 반영할 수 있게 하는 옵션
//         populateCache: false,
//         revalidate: false,
//         rollbackOnError: true,
//       });
//       // fetch('api/likes', {
//       //   method: 'PUT',
//       //   body: JSON.stringify({ id: post.id, like }),
//       // }).then(() => mutate('/api/posts'));
//     },
//     [user, mutate]
//   );

//   const toggleFollow = useCallback(
//     (targetId: string, follow: boolean) => {
//       return mutate(updateFollow(targetId, follow), { populateCache: false }); // populateCache: false인 이유는 updateFollow로 리턴한 값으로 cache값을 대체하고 싶지 않기 떄문
//     },
//     [mutate]
//   );

//   return { user, isLoading, error, setBookmark, toggleFollow };
// }
