/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "ds-storage.sgp1.cdn.digitaloceanspaces.com",
      "assets.coingecko.com",
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      encoding: "commonjs encoding",
    });
    return config;
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
};

module.exports = nextConfig;
