'use client';
import { SimplePost } from '@/model/post';
import { Ultra } from 'next/font/google';
import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

export default function PostList() {
  const { data: posts, isLoading: loading } =
    useSWR<SimplePost[]>('/api/posts');
  console.log(posts);

  return (
    <section>
      {loading && (
        <div className='mt-32 text-center'>
          <GridLoader color='red' />
        </div>
      )}
      {posts && (
        <ul>
          <ul>
            {posts.map((post) => (
              <li key={post.id} className='mb-4'>
                <PostListCard post={post} />
              </li>
            ))}
          </ul>
        </ul>
      )}
    </section>
  );
}
