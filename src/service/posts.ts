import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
...,
"username": author->username,
"userImage": author->image,
"image": photo,
"likes": likes[]->username,
"text": comments[0].comment,
"comments": count(comments),
"id":_id,
"createdAt":_createdAt,
`; // post.author.username -> post.username

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      // 포스트 작성자가 로그인한 사람과 동일하면 해당 포스트를 가져온다.
      `*[_type == "post" && author->username == "${username}"
    || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
    | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}
