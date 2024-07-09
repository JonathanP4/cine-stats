/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.themoviedb.org",
                port: "",
                pathname: "/t/p/w300_and_h450_bestv2/**",
            },
        ],
    },
};

export default nextConfig;
