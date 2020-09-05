import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import {
  AppTabType,
  AppTabRoomKey,
  AppTabSpaceKey,
  AppTabUserKey,
} from "@sentrei/types/models/AppTab";
import Profile from "@sentrei/types/models/Profile";

export interface Props {
  profile?: Profile.Get;
  namespaceId?: string;
  appKey: AppTabRoomKey | AppTabUserKey | AppTabSpaceKey;
  type: AppTabType;
}

export default function SeoApp({
  profile,
  namespaceId,
  appKey,
  type,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <NextSeo
      nofollow
      noindex
      title={t(`seo:${type}.${appKey}`)}
      titleTemplate={`${namespaceId || profile?.name}: %s`}
    />
  );
}
