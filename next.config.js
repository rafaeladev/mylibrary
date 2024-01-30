// next.config.js
const nextConfig = {
  images: {
    domains: ["books.google.com", "images-na.ssl-images-amazon.com"],
  },
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || "",
  },
};

module.exports = nextConfig;
