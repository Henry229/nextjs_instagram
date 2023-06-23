import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import SignIn from '@/components/SignIn';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signing',
  description: 'Signup or Login to Instantgram',
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex justify-center mt-24'>
      <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
