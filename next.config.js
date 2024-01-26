// next.config.js
const nextConfig = {
  images: {
    domains: ["books.google.com"],
  },
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || "",
  },
};

module.exports = nextConfig;
