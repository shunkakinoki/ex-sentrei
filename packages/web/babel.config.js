const plugins = [
  [
    "styled-components",
    {
      ssr: true,
      displayName: true,
      preprocess: false,
    },
  ],
];
const presets = ["next/babel"];
if (process.env.NODE_ENV === "test") {
  plugins.push(["istanbul"]);
}
module.exports = {
  plugins: plugins,
  presets: presets,
  babelrc: false,
};
