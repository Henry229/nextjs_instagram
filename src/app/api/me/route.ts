import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getUserByUsername } from '@/service/user';
import { withSessionUser } from '@/util/session';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}
