// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addComment } from '@/service/posts';
import { withSessionUser } from '@/util/session';
// import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    // body를 풀어서 {id, like}로 했다
    const { id, comment } = await req.json();
    // commnet는 boolean type이라 id와 같이 앞에 !을 쓰지 못한다
    // 그래서 boolean type이 !를 확인할 때는 comment === undefined로 해야 한다.
    // 여기서 comment가 null과 undefined을 동시에 확인하고 싶다면 null 값을 비교하면 된다.
    if (!id || comment === null) {
      return new Response('Bad Request', { status: 400 });
    }

    return addComment(id, user.id, comment) //
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
