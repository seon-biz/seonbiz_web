import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: '/notes/choose-coaching',
      destination: '/process#pricing',
      permanent: true,
    }];
  },
};

export default nextConfig;
