const path = require("path");

const aliases = {
  "@sentrei/types": path.join(__dirname, "../../@types/dist"),
  "@sentrei/common": path.join(__dirname, "../../common/dist"),
  "@sentrei/ui": path.join(__dirname, "../src"),
};

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
    };

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
