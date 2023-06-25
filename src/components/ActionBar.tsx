import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '@/hooks/post';

type Props = {
  post: SimplePost;
};
export default function ActionBar({ post }: Props) {
  const { id, likes, username, createdAt, text } = post;
  const { data: session } = useSession();
  const user = session?.user;
  // const [liked, setLiked] = useState(
  //   user ? likes.includes(user.username) : false
  // );
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  // const { mutate } = useSWRConfig();
  // to make custom hook
  // 아래의 의미는 커스텀 훅인 usePosts() 를 호출하면 내가 좋아요를 처리할 수 있는 setLike함수를 받아온다는 의미이다.
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };
  // const handleLike = (like: boolean) => {
  //   fetch('api/likes', {
  //     method: 'PUT',
  //     body: JSON.stringify({ id, like }),
  //     // }).then(() => setLiked(like));
  //   }).then(() => mutate('/api/posts'));
  // };
  return (
    <>
      <div className='flex justify-between px-4 my-2'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='mb-2 text-sm font-bold'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className='mr-1 font-bold'>{username}</span>
            {text}
          </p>
        )}
        <p className='my-2 text-xs uppercase text-neutral-500'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
