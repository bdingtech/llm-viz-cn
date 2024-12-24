/** @type {import('next').NextConfig} */

let withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.elf$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[hash][ext]'
      }
    });
    return config;
  },
  async headers() {
    return [
      {
        source: '/riscv/examples/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/octet-stream',
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/llm-viz",
        destination: "/llm",
        permanent: true,
      },
    ];
  }
};

module.exports = withBundleAnalyzer(nextConfig);
