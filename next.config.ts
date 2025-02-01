import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 

  images:{
    remotePatterns:[
      {
        hostname:"gallant-seal-176.convex.cloud",
        protocol:'https'
      }
      
    ]
  }
};

export default nextConfig;
