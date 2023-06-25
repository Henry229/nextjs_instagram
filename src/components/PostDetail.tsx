import { FullPost, SimplePost } from '@/model/post';
import userSWR from 'swr';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data } = userSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section className='flex w-full h-full'>
      <div className='relative basis-3/5'>
        <Image
          className='object-cover'
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes='650px'
        />
        {/* fill은 너비는 부모요소에 의존하고 길이는 원래 길이대로.. 이것을 처리하기 위해 부모 div에 absolute처럼 Relative를 둔다. */}
      </div>
      <div className='flex flex-col w-full basis-2/5'>
        <PostUserAvatar image={userImage} username={username} />
        <ul className='h-full p-4 mb-1 overflow-y-auto border-t border-gray-200'>
          {comments &&
            comments.map(
              ({ image, username: commentUserName, comment }, index) => (
                <li key={index} className='flex items-center mb-1'>
                  <Avatar
                    image={image}
                    size='small'
                    highlight={commentUserName === username}
                  />
                  <div className='ml-2'>
                    <span className='mr-1 font-bold'>{commentUserName}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm />
      </div>
    </section>
  );
}
