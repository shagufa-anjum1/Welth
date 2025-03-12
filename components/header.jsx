import { SignedIn, SignedOut, SignInButton,  UserButton } from '@clerk/nextjs';
import Link from 'next/link'; // ✅ Correct Link component
import Image from 'next/image'; // ✅ Import Next.js Image component
import React from 'react';
import { Button } from './ui/button';
import { LayoutDashboard, PenBox, TypeOutline } from 'lucide-react';

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
      <div className='flex items-center space-x-4'>
        <SignedIn>
          <Link href={'/dashboard'} className='text-gray-600 hover:text-blue-600 flex items-center gap-2'>
          <Button variant="outline">
          <LayoutDashboard size={18} /> 
          <span className='hidden md:inline'>Dashboard</span>
          </Button>
          </Link>

          <Link href={'/transactions/create' } className=' flex items-center gap-2'>
          <Button >
          <PenBox size={18} /> 
          <span className='hidden md:inline'>Add Transactions</span>
          </Button>
          </Link>


        </SignedIn>
        <SignedOut>
          <SignInButton forceRedirectUrl='/dashboard'>
             <Button variant="outline" >Login</Button>
          </SignInButton> 
        </SignedOut>

        <SignedIn>
          <UserButton  appearance={{
             elements: { 
              avatarBox: "w-10 h-10"
               }, 
          }}/>
        </SignedIn>
      </div>  
    </nav>
  </div>
  );
};

export default Header;
