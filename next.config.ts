import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    crossOrigin: "anonymous",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
        ],
    },
};

export default nextConfig;