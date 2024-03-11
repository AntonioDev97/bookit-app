/** @type {import('next').NextConfig} */
const W3ProfileUrl = new URL(process.env.W3PROFILE_API_URL).hostname;
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: W3ProfileUrl }]
    }
};

export default nextConfig;
