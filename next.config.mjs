
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    future: { webpack5: true },

/*images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: ['lh3.googleusercontent.com'],
                port: '',
                pathname: '/**',
            },
        ],
    },*/
   
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  //module.exports = nextConfig
  export default nextConfig
