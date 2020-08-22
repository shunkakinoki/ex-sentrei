import * as React from "react";

import Theme from "@sentrei/common/containers/LightTheme";

const Meta = (): JSX.Element => {
  return (
    <>
      <title>Sentrei</title>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:300,400,500,700&display=swap"
      />
      <link rel="icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#3f51b5" />
      <meta name="theme-color" content={Theme.palette.primary.main} />
      {/* <link rel="canonical" href={data.canonical_url} />

      <meta name="description" content={data.description} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content={Theme.palette.primary.main} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:image" content={data.image} />
      <meta property="og:url" content={data.canonical_url} />
      <meta property="og:site_name" content={data.title} />

      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:site" content={data.twitter_user} />
      <meta name="twitter:creator" content={data.twitter_user} /> */}
    </>
  );
};

export default Meta;
