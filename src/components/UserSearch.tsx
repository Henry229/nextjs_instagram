'use client';

import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import userSWR from 'swr';
import GridSpinner from './ui/GridSpinner';

export default function UserSearch() {
  // /api/search/${keyword}
  // 검색하는 keyword가 있다면 /api/search/bob -> 유저네임이나, 네임 리턴
  // 검색하는 keyword가 없다면 /api/search/ -> 전체유저 리턴
  const [keyword, setKeyword] = useState('');
  const {
    data: users,
    isLoading,
    error,
  } = userSWR<ProfileUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          autoFocus
          placeholder='Search for a usename of name'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>Something must be wrong!!😵‍💫</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No users found</p>}
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <p>{user.username}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
