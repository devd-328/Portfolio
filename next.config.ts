import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3000", "127.0.0.1:3000", "10.103.157.39:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yhsyqajzouyfqrrgrjjg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
