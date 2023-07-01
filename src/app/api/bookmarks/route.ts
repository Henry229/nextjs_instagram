import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dislikePost, likePost } from '@/service/posts';
import { addBookmark, removeBookmark } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response('Bad Request', { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.id, id) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

// import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import { addBookmark, removeBookmark } from '@/service/user';
// import { getServerSession } from 'next-auth';
// import { NextRequest, NextResponse } from 'next/server';

// export async function PUT(req: NextRequest) {
//   const session = await getServerSession(authOptions);
//   const user = session?.user;
//   console.log('**user:', user);

//   if (!user) {
//     return new Response('Unauthorized', { status: 401 });
//   }
//   // body를 풀어서 {id, like}로 했다
//   const { id, bookmark } = await req.json();

//   if (!id || bookmark === undefined) {
//     return new Response('Bad Request', { status: 400 });
//   }

//   const request = bookmark ? addBookmark : removeBookmark;

//   return (
//     request(user.id, id) //
//       .then((res) => NextResponse.json(res))
//       // .catch((error) => NextResponse.json(error, { status: 500 }));
//       .catch((error) => {
//         console.error('**error:', error);
//         new Response(JSON.stringify(error), { status: 500 });
//       })
//   );
// }
