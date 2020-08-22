const readDayFileList = require("./scripts/day.js");
const readSusFileList = require("./scripts/sus.js");
const readWeekFileList = require("./scripts/week.js");

module.exports = {
  title: "pioneer",
  description: "Pionner Journal from Sentrei",
  base: "/",
  theme: "yuu",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/logo.png",
      },
    ],
  ],
  plugins: [
    [
      "vuepress-plugin-rss",
      {
        base_url: "/",
        site_url: "https://pioneer.sentrei.com",
        count: 30,
      },
      "sitemap",
      {
        hostname: "https://pioneer.sentrei.com",
      },
      "@vuepress/active-header-links",
      "@vuepress/back-to-top",
      "@vuepress/search",
      {
        searchMaxSuggestions: 30,
      },
      "@vuepress/nprogress",
    ],
  ],
  themeConfig: {
    lastUpdated: "Last Updated",
    nav: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Mission",
        link: "/mission/",
      },
      {
        text: "Project",
        link: "/project/",
      },
      {
        text: "Github",
        link: "https://github.com/sentrei/sentrei",
      },
    ],
    sidebar: [
      ["/mission/", "Mission"],
      ["/project/", "Project"],
      {
        title: "2020 Startup School",
        collapsable: true,
        children: readSusFileList("2020"),
      },
      {
        title: "2020 Week",
        collapsable: true,
        children: readWeekFileList("2020"),
      },
      {
        title: "2020/08",
        collapsable: true,
        children: readDayFileList("2020", "08"),
      },
      {
        title: "2020/07",
        collapsable: true,
        children: readDayFileList("2020", "07"),
      },
      {
        title: "2020/06",
        collapsable: true,
        children: readDayFileList("2020", "06"),
      },
      {
        title: "2020/05",
        collapsable: true,
        children: readDayFileList("2020", "05"),
      },
    ],
    yuu: {
      defaultDarkTheme: true,
      defaultColorTheme: "blue",
    },
  },
};
