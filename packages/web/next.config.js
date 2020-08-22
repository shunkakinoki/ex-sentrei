const path = require("path");
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
// const withSourceMaps = require("@zeit/next-source-maps")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const {StatsWriterPlugin} = require("webpack-stats-plugin");

// @ts-ignore
const {SentryWebpackPlugin} = require("@sentry/webpack-plugin");

const withBundleStats = require("next-plugin-bundle-stats")({
  baseline: true,
  compare: false,
  json: true,
});

const withOptimizedImages = require("next-optimized-images")({
  inlineImageLimit: -1,
  imagesFolder: "images",
  imagesName: "[name]-[hash].[ext]",
  handleImages: ["jpeg", "png", "ico", "svg", "webp"],
  optimizeImages: true,
  optimizeImagesInDev: true,
  defaultImageLoader: "img-loader",
  mozjpeg: {
    quality: 80,
  },
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: false,
  svgo: {},
  webp: {
    preset: "default",
    quality: 75,
  },
});

const aliases = {
  "@assets": path.join(__dirname, "assets"),
  "@sentrei/common": path.join(__dirname, "../common"),
  "@sentrei/ui": path.join(__dirname, "../ui"),
  "@sentrei/web": path.join(__dirname, "src"),
};

const nextConfig = {
  target: "experimental-serverless-trace",
  trailingSlash: false,
  publicRuntimeConfig: {
    DATA_CLIENT_ID: process.env.DATA_CLIENT_ID,
    PAPERCUPS_ID: process.env.PAPERCUPS_ID,
  },
  serverRuntimeConfig: {
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    METOMIC_PROJECT_ID: process.env.METOMIC_PROJECT_ID,
    PAPERCUPS_ID: process.env.PAPERCUPS_ID,
    SENTREI_VERSION: require("./package.json").version,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT,
    SENTRY_RELEASE: process.env.SENTRY_RELEASE,
    VERCEL_GITHUB_COMMIT_REF: process.env.VERCEL_GITHUB_COMMIT_REF,
  },
  webpack: config => {
    config.node = {
      fs: "empty",
      child_process: "empty",
      net: "empty",
      dns: "empty",
      tls: "empty",
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
    };
    config.resolve.modules.push(path.resolve("./"));
    if (process.env.NODE_ENV !== "production") {
      config.plugins.push(
        new StatsWriterPlugin({
          filename: "webpack-stats.json",
          stats: {
            context: "./src",
            assets: true,
            entrypoints: true,
            chunks: true,
            modules: true,
          },
        }),
      );
    }
    if (process.env.SENTRY_DNS) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules", "cypress", "test"],
          urlPrefix: "~/_next",
        }),
      );
    }
    config.resolve.symlinks = true;
    return config;
  },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withBundleStats],
    [withCSS],
    [withOptimizedImages],
    [withSass],
    // [withSourceMaps], #1462
  ],
  nextConfig,
);
