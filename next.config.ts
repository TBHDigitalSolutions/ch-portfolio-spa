// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enhanced TypeScript support
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },

  // Enhanced image optimization for portfolio assets
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      // ADDED: Google Cloud Storage domain for portfolio assets
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      // Optional: Add specific bucket pattern for better security
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/ch-portfolio-spa-content-bucket/**',
      },
    ],
  },

  // ✅ FIXED: Turbopack configuration - Remove css-loader incompatible rules
  turbopack: {
    resolveAlias: {
      // Optimize Video.js imports for Turbopack
      'video.js': 'video.js/dist/video.min.js',
    },
  },

  // Enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Webpack configuration for non-Turbopack builds
  webpack: (config, { dev, isServer }) => {
  // Only apply webpack config when not using Turbopack
  if (!process.env.TURBOPACK) {
    // Optimize for portfolio assets
    config.module.rules.push(
      {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext]',
          },
        },
        {
          test: /\.pdf$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/documents/[name].[hash][ext]',
          },
        }
      );

      // Optimize bundle for Video.js and media libraries
      config.resolve.alias = {
        ...config.resolve.alias,
        'video.js': 'video.js/dist/video.min.js',
      };

      // 🚨 Inject canvas fallback to avoid Vercel build errors
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          canvas: false,
        };
      }

      // Optimize for JSON data files
      config.module.rules.push({
        test: /\.json$/,
        type: 'json',
      });
    }

    return config;
  },

  // Enhanced headers for performance and security
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Rewrites for clean URLs (if needed)
  async rewrites() {
    return [
      {
        source: '/portfolio/:section',
        destination: '/#:section',
      },
    ];
  },

  // Output configuration for deployment
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  trailingSlash: false,
};

export default nextConfig;