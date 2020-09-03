import {DefaultSeo} from "next-seo";
import * as React from "react";

export interface Props {
  nofollow: boolean;
}

export default function SeoDefault({nofollow = false}: Props): JSX.Element {
  return (
    <DefaultSeo
      nofollow={nofollow}
      description="Bond. Focus. Work. -A dedicated video conferencing tool that helps you get things done-"
      titleTemplate="Sentrei | %s"
      openGraph={{
        type: "website",
        locale: "en_US",
        url: "https://sentrei.com",
        site_name: "sentrei.com",
      }}
      twitter={{
        handle: "@sentrei_com",
        site: "@sentrei_com",
        cardType: "summary_large_image",
      }}
    />
  );
}
