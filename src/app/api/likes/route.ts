import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dislikePost, likePost } from '@/service/posts';
import { withSessionUser } from '@/util/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    // body를 풀어서 {id, like}로 했다
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Request', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return (
      request(id, user.id) //
        .then((res) => NextResponse.json(res))
        // .catch(error => NextResponse.json(error, { status: 500 }))
        .catch((error) => new Response(JSON.stringify(error), { status: 500 }))
    );
  });
}
