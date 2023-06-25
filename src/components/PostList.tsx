'use client';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/post';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  //   useSWR<SimplePost[]>('/api/posts');
  // console.log(posts); -> custom hook인 usePosts()를 만들어서 위의 로직은 필요없어짐

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
