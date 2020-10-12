import List from "@material-ui/core/List";
import InfoIcon from "@material-ui/icons/Info";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import PollIcon from "@material-ui/icons/Poll";
import useTranslation from "next-locale/useTranslation";
import * as React from "react";

import LandingHeaderMenu from "@sentrei/ui/components/LandingHeaderMenu";
import LandingHeaderMenuItem from "@sentrei/ui/components/LandingHeaderMenuItem";

export default function LandingHeaderMenucompany(): JSX.Element {
  const {t} = useTranslation();

  return (
    <LandingHeaderMenu title={t("header:header.company")} type="company">
      <List dense>
        <LandingHeaderMenuItem
          href="/about"
          icon={<InfoIcon />}
          title={t("header:company.about.title")}
          description={t("header:company.about.description")}
        />
        <LandingHeaderMenuItem
          href="/analytics"
          icon={<PollIcon />}
          title={t("header:company.analytics.title")}
          description={t("header:company.analytics.description")}
        />
        <LandingHeaderMenuItem
          href="/media"
          icon={<PermMediaIcon />}
          title={t("header:company.media.title")}
          description={t("header:company.media.description")}
        />
      </List>
    </LandingHeaderMenu>
  );
}
