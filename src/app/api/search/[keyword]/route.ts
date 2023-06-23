import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { keyword: string };
};

export async function GET(_: NextRequest, context: Context) {
  // export async function GET(req: NextRequest, context: Context) 사용하지 않는 인자는 '_'로 바꿔줌
  // 셔센연결 여부는 체크하지 않는다. cause 로그인 하지 않아도 검색이 가능하게 끔
  // searchUser 함수는 param이 있는 다이니믹 라우트와 그냥 라우트에 모두 쓰이고, param을 넘겨주냐 안주냐에 따라 다른 결과를 리턴함
  return searchUsers(context.params.keyword) //
    .then((data) => NextResponse.json(data));
}
