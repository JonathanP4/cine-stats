/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    onError: (err, _defaultOnError) => {
        return true;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.themoviedb.org",
                port: "",
                pathname: "/t/p/w300_and_h450_bestv2/**",
            },
            {
                protocol: "https",
                hostname: "media.themoviedb.org",
                port: "",
                pathname: "/t/p/original/**",
            },
        ],
    },
};

export default nextConfig;
