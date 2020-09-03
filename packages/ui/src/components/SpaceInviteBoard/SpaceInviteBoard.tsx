import Box from "@material-ui/core/Box";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import * as React from "react";

import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import InviteFormEmail from "@sentrei/ui/components/InviteFormEmail";
import InviteFormLink from "@sentrei/ui/components/InviteFormLink";
import InviteFormUsername from "@sentrei/ui/components/InviteFormUsername";
import InviteList from "@sentrei/ui/components/InviteList";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  invites: Invite.Get[] | null | undefined;
  spaceId: string;
  user: User.Get;
}

export default function SpaceInviteBoard({
  profile,
  invites,
  user,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  return (
    <>
      <FormSection icon={<SettingsIcon />} title={t("common:common.invite")} />
      <TabBoard
        size="sm"
        tabIconOne={<EmailIcon />}
        tabIconTwo={<LinkIcon />}
        tabIconThree={<AssignmentIndIcon />}
        tabLabelOne={t("common:common.email")}
        tabLabelTwo={t("common:common.link")}
        tabLabelThree={t("common:common.username")}
        tabPanelOne={
          <>
            <InviteFormEmail profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="email" />}
          </>
        }
        tabPanelTwo={
          <>
            <InviteFormLink profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="link" />}
          </>
        }
        tabPanelThree={
          <InviteFormUsername profile={profile} user={user} spaceId={spaceId} />
        }
      />
    </>
  );
}
