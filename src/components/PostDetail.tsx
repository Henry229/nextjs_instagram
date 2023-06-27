import { SimplePost } from '@/model/post';
// import userSWR from 'swr';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
// import CommentForm from './CommentForm';
import Avatar from './Avatar';
import useFullPosts from '@/hooks/postSingle';
// import useMe from '@/hooks/me';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image } = post;
  // const { data } = userSWR<FullPost>(`/api/posts/${id}`);
  const { post: data, postComment } = useFullPosts(id);
  // const { user } = useMe();
  const comments = data?.comments;

  // const handlePostComment = (comment: Comment) => {
  //   postComment(comment);
  // }; 전달 받은 인를 postComment에 인자로 전달하니까 굳이 인자로 만들 필요없다.

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
        <ActionBar post={post} onComment={postComment} />
        {/* <CommentForm onPostComment={handlePostComment} /> */}
      </div>
    </section>
  );
}
