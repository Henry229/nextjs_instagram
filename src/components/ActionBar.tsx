import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '@/hooks/post';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';
type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};
export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };
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
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='mb-2 text-sm font-bold'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className='my-2 text-xs uppercase text-neutral-500'>
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}

// import HeartIcon from './ui/icons/HeartIcon';
// import BookmarkIcon from './ui/icons/BookmarkIcon';
// import { parseDate } from '@/util/date';
// // import { useState } from 'react';
// import ToggleButton from './ui/ToggleButton';
// import HeartFillIcon from './ui/icons/HeartFillIcon';
// import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
// import { Comment, SimplePost } from '@/model/post';
// // import { useSession } from 'next-auth/react';
// // import { useSWRConfig } from 'swr';
// import usePosts from '@/hooks/post';
// import useMe from '@/hooks/me';
// import CommentForm from './CommentForm';

// type Props = {
//   post: SimplePost;
//   children?: React.ReactNode;
//   onComment: (comment: Comment) => void;
// };
// export default function ActionBar({ post, children, onComment }: Props) {
//   const { id, likes, createdAt } = post;
//   const { user, setBookmark } = useMe();
//   const { setLike } = usePosts();
//   // const { data: session } = useSession();
//   // const user = session?.user;
//   // const [liked, setLiked] = useState(
//   //   user ? likes.includes(user.username) : false
//   // );
//   const liked = user ? likes.includes(user.username) : false;
//   const bookmarked = user?.bookmarks.includes(id) ?? false;
//   // const [bookmarked, setBookmarked] = useState(false);
//   // const { mutate } = useSWRConfig();
//   // to make custom hook
//   // 아래의 의미는 커스텀 훅인 usePosts() 를 호출하면 내가 좋아요를 처리할 수 있는 setLike함수를 받아온다는 의미이다.
//   const handleLike = (like: boolean) => {
//     user && setLike(post, user.username, like);
//   };

//   const handleBookmark = (bookmark: boolean) => {
//     user && setBookmark(id, bookmark);
//   };
//   // const handleLike = (like: boolean) => {
//   //   fetch('api/likes', {
//   //     method: 'PUT',
//   //     body: JSON.stringify({ id, like }),
//   //     // }).then(() => setLiked(like));
//   //   }).then(() => mutate('/api/posts'));
//   // };

//   const handleComment = (comment: string) => {
//     user && onComment({ comment, username: user.username, image: user.image });
//   };
//   return (
//     <>
//       <div className='flex justify-between px-4 my-2'>
//         <ToggleButton
//           toggled={liked}
//           onToggle={handleLike}
//           onIcon={<HeartFillIcon />}
//           offIcon={<HeartIcon />}
//         />
//         <ToggleButton
//           toggled={bookmarked}
//           onToggle={handleBookmark}
//           onIcon={<BookmarkFillIcon />}
//           offIcon={<BookmarkIcon />}
//         />
//       </div>
//       <div className='px-4 py-1'>
//         <p className='mb-2 text-sm font-bold'>{`${likes?.length ?? 0} ${
//           likes?.length > 1 ? 'likes' : 'like'
//         }`}</p>
//         {/* {text && (
//           <p>
//             <span className='mr-1 font-bold'>{username}</span>
//             {text}
//           </p>
//         )} */}
//         {children}
//         <p className='my-2 text-xs uppercase text-neutral-500'>
//           {parseDate(createdAt)}
//         </p>
//       </div>
//       <CommentForm onPostComment={handleComment} />
//     </>
//   );
// }
