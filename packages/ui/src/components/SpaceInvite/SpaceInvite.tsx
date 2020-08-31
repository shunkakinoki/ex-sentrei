import Box from "@material-ui/core/Box";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getInvitesLive} from "@sentrei/common/firebase/invites";
import {getSpace} from "@sentrei/common/firebase/spaces";
import Invite from "@sentrei/types/models/Invite";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import GridSettings from "@sentrei/ui/components/GridSettings";
import InviteEmailForm from "@sentrei/ui/components/InviteEmailForm";
import InviteLinkForm from "@sentrei/ui/components/InviteLinkForm";
import InviteList from "@sentrei/ui/components/InviteList";
import InviteNamespaceForm from "@sentrei/ui/components/InviteNamespaceForm";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

export interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpaceInvite({
  profile,
  user,
  spaceId,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [invites, setInvites] = React.useState<
    Invite.Get[] | null | undefined
  >();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  React.useEffect(() => {
    const unsubscribe = getInvitesLive(spaceId, snap => {
      setInvites(snap);
    });
    return (): void => {
      unsubscribe();
    };
  }, [spaceId]);

  if (space === undefined) {
    return (
      <GridSettings skeleton tabSpaceKey="invite" type="space">
        <SkeletonForm />
      </GridSettings>
    );
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <GridSettings spaceId={spaceId} tabSpaceKey="invite" type="space">
      <FormSection icon={<SettingsIcon />} title={t("common:common.invite")} />
      <TabBoard
        size="sm"
        tabIconOne={<EmailIcon />}
        tabIconTwo={<LinkIcon />}
        tabIconThree={<AssignmentIndIcon />}
        tabLabelOne={t("common:common.email")}
        tabLabelTwo={t("common:common.link")}
        tabLabelThree={t("common:common.namespace")}
        tabPanelOne={
          <>
            <InviteEmailForm profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="email" />}
          </>
        }
        tabPanelTwo={
          <>
            <InviteLinkForm profile={profile} user={user} spaceId={spaceId} />
            <Box p={1} />
            {invites && <InviteList invites={invites} type="link" />}
          </>
        }
        tabPanelThree={
          <InviteNamespaceForm
            profile={profile}
            user={user}
            spaceId={spaceId}
          />
        }
      />
    </GridSettings>
  );
}
