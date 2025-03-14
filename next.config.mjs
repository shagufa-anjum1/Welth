/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ['randomuser.me'], // ✅ This is fine
  
      remotePatterns: [
        {
          protocol: 'https', // ✅ Fixed spelling!
          hostname: 'randomuser.me', // ✅ Should be hostname, not host
        },
      ],
    },
  };
  
  export default nextConfig;
  