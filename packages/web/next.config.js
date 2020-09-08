const withPlugins = require("next-compose-plugins");
const withSourceMaps = require("@zeit/next-source-maps")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const SentryWebpackPlugin = require("@sentry/webpack-plugin");

// @ts-ignore
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

const BRANCH = String(process.env.VERCEL_GITHUB_COMMIT_REF).replace(
  "refs/heads/",
  "",
);

const nextConfig = {
  target: "experimental-serverless-trace",
  trailingSlash: false,
  publicRuntimeConfig: {
    DATA_CLIENT_ID: process.env.DATA_CLIENT_ID,
    PAPERCUPS_ID: process.env.PAPERCUPS_ID,
    SEGMENT_ID: process.env.SEGMENT_ID,
  },
  serverRuntimeConfig: {
    rootDir: __dirname,
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
    SEGMENT_ID: process.env.SEGMENT_ID,
    SENTREI_VERSION: require("./package.json").version,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_ENVIRONMENT:
      process.env.SENTRY_ENVIRONMENT ||
      new Set(["alpha", "beta", "main"]).has(BRANCH)
        ? BRANCH
        : "dev",
    SENTRY_RELEASE: require("./package.json").version,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    VERCEL_GITHUB_COMMIT_REF: BRANCH,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/browser"] = "@sentry/node";
    }
    config.plugins.push(
      // @ts-ignore
      new SentryWebpackPlugin({
        include: ".next",
        ignore: ["node_modules"],
        stripPrefix: ["webpack://_N_E/"],
        urlPrefix: `~/_next`,
        release: require("./package.json").version,
      }),
    );
    return config;
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer, withSourceMaps, [withOptimizedImages]],
  nextConfig,
);
