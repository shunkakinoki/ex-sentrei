import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {
  AppTabModel,
  AppTabRoomKey,
  AppTabSpaceKey,
  AppTabUserKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";

export interface Props {
  profile?: Profile.Get;
  namespaceId?: string;
  appKey: AppTabRoomKey | AppTabUserKey | AppTabSpaceKey;
  model: AppTabModel;
}

export default function SeoApp({
  profile,
  namespaceId,
  appKey,
  model,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <NextSeo
      nofollow
      noindex
      title={t(`seo:${model}.${appKey}`)}
      titleTemplate={`${namespaceId || profile?.name || "Sentrei"} - %s`}
    />
  );
}
