/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: 'http://localhost:3000',
        REVALIDATE_TOKEN: 'MyOTHERT0k3n0102345'
    },
    images: {
        remotePatterns: [{ hostname: 'res.cloudinary.com' }]
    }
}

module.exports = nextConfig
