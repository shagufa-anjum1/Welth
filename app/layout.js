import Header from '@/components/header';
import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Welth',
  description: 'One Stop Financial Solution',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
      {/*header*/}
        <Header>

        </Header>
        <main className='min-h-screen'>{children}</main>
        {/*footer*/} 
        <footer className='bg-blue-100 py-15 text-white text-center p-4'>
          <div className='container mx-auto px-4 text-center text-gray-600'>
            <p>
            Made with 💗 by Shagufa Anjum
            </p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
