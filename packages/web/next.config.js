const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const branch = String(process.env.VERCEL_GITHUB_COMMIT_REF).replace(
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
      new Set(["alpha", "beta", "main"]).has(branch)
        ? branch
        : "dev",
    SENTRY_RELEASE: Number(require("./package.json").version),
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    VERCEL_GITHUB_COMMIT_REF: branch,
  },
  webpack: (config, options) => {
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    config.plugins.push(
      // @ts-ignore
      new SentryWebpackPlugin({
        include: ".next",
        ignore: ["node_modules"],
        stripPrefix: ["webpack://_N_E/"],
        urlPrefix: `~/_next`,
      }),
    );

    return config;
  },
};

module.exports = withPlugins(
  [[withBundleAnalyzer, withSass, withSourceMaps]],
  nextConfig,
);
