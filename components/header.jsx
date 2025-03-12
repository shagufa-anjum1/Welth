import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link'; // ✅ Correct Link component
import Image from 'next/image'; // ✅ Import Next.js Image component
import React from 'react';
import { Button } from './ui/button';
import { TypeOutline } from 'lucide-react';

const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b '>
      <nav className='container mx-auto flex justify-between items-center py-4 px-4'>
        <Link href='/'>
          <Image 
            src='/logo.png' 
            alt='Welth logo' 
            width={200} 
            height={60} 
            className="h-12 w-auto object-contain"
          /> 
        </Link>
    
      <SignedOut>
          <SignInButton>
             <Button variant={TypeOutline}>Login</Button>
          </SignInButton> 
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
      </nav>
    </div>
  );
};

export default Header;
