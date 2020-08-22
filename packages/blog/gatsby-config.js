module.exports = {
  siteMetadata: {
    title: "Blog",
    name: "Sentrei Blog",
    siteUrl: "https://blog.sentrei.com",
    description: "Sentrei Blog",
    hero: {
      heading: "Official Sentrei Blog",
      maxWidth: 652,
    },
    social: [
      {
        name: "github",
        url: "https://github.com/sentrei",
      },
    ],
    languages: ["en", "ja"],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        mailchimp: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Novela by Narative",
        short_name: "Novela",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#fff",
        display: "standalone",
        icon: "src/assets/favicon.png",
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "en",
        langKeyDefault: "en",
        useLangKeyLayout: true,
        prefixDefault: true,
        pagesPaths: ["/content"],
      },
    },
  ],
};
