'use client';

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/me';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { user: loggedInUser } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'unfollow' : 'follow';
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === 'unfollow'} />
      )}
    </>
  );
}
