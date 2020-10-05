import List from "@material-ui/core/List";
import BookIcon from "@material-ui/icons/Book";
import MapIcon from "@material-ui/icons/Map";
import NewReleasesIcon from "@material-ui/icons/NewReleases";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";
import LandingHeaderMenuItem from "@sentrei/ui/components/LandingHeaderMenuItem";

export default function LandingHeaderMenuresources(): JSX.Element {
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.resources")}>
      <List dense>
        <LandingHeaderMenuItem
          href="https://pioneer.sentrei.com"
          target="_blank"
          rel="noopener"
          icon={<BookIcon />}
          title={t("header:resources.pioneer.title")}
          description={t("header:resources.pioneer.description")}
        />
        <LandingHeaderMenuItem
          href="https://github.com/sentrei/sentrei/releases"
          target="_blank"
          rel="noopener"
          icon={<NewReleasesIcon />}
          title={t("header:resources.releases.title")}
          description={t("header:resources.releases.description")}
        />
        <LandingHeaderMenuItem
          href="https://github.com/sentrei/sentrei/projects/1"
          target="_blank"
          rel="noopener"
          icon={<MapIcon />}
          title={t("header:resources.roadmap.title")}
          description={t("header:resources.roadmap.description")}
        />
      </List>
    </LandingHeaderMenu>
  );
}
