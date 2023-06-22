import { searchUsers } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // 셔센연결 여부는 체크하지 않는다. cause 로그인 하지 않아도 검색이 가능하게 끔
  return searchUsers().then((data) => NextResponse.json(data));
}
