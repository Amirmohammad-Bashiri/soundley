const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
    domains: [
      "api.deezer.com",
      "e-cdns-images.dzcdn.net",
      "lh3.googleusercontent.com",
    ],
  },
});
