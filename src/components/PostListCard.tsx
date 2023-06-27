'use Client';

import { Comment, SimplePost } from '@/model/post';
// import Avatar from './Avatar';
import Image from 'next/image';
// import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import { useState } from 'react';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hooks/post';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className='border border-gray-200 rounded-lg shadow-md'>
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className='object-cover w-full aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className='mr-1 font-bold'>{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className='my-2 text-sm font-bold tex t-sky-500'
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>

      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
