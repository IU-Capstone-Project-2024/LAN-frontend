/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, {isServer}) => {
        if (isServer) {
            config.module.rules.push({
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/images',
                        outputPath: 'static/images',
                        name: '[name].[hash].[ext]',
                        esModule: false,
                    },
                },
            });
        }

        return config;
    }
};

export default nextConfig;
