'use client';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  console.log(posts);

  return (
    <section>
      {loading && (
        <div className='mt-32 text-center'>
          <GridSpinner color='red' />
        </div>
      )}
      {posts && (
        <ul>
          <ul>
            {posts.map((post, index) => (
              <li key={post.id} className='mb-4'>
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
          </ul>
        </ul>
      )}
    </section>
  );
}
