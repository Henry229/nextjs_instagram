import './globals.css';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instantgram',
    template: 'Instantgram | %s',
  },
  // 하위 children 에서 title을 지정하면 이 template을 쓰도록 지정하는 것. 그래서 Instantgram 다음에 %s를 써서 만듬.
  description: 'Instantgram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body
        className='w-full overflow-auto bg-neutral-50'
        suppressHydrationWarning={true}
      >
        <AuthContext>
          <header className='sticky top-0 z-10 bg-white border-b'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='flex justify-center w-full max-w-screen-xl mx-auto'>
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal' />
      </body>
    </html>
  );
}
