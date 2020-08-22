import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import PhotoIcon from "@material-ui/icons/Photo";
import SettingsIcon from "@material-ui/icons/Settings";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";
import SpaceDescriptionForm from "@sentrei/ui/components/SpaceDescriptionForm";
import SpaceNameForm from "@sentrei/ui/components/SpaceNameForm";
import TabBoard from "@sentrei/ui/components/TabBoard";

interface Props {
  profile: Profile.Get;
  spaceId: string;
  user: User.Get;
}

export default function SpaceEdit({
  profile,
  spaceId,
  user,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <FormSection
        icon={<SettingsIcon />}
        title={t("space:space.editSpace")}
        size="md"
      />
      <TabBoard
        size="sm"
        tabIconOne={<DescriptionIcon />}
        tabIconTwo={<AssignmentIndIcon />}
        tabIconThree={<PhotoIcon />}
        tabLabelOne={t("common:common.description")}
        tabLabelTwo={t("common:common.name")}
        tabLabelThree={t("common:common.photo")}
        tabPanelOne={
          <SpaceDescriptionForm profile={profile} space={space} user={user} />
        }
        tabPanelTwo={
          <SpaceNameForm profile={profile} space={space} user={user} />
        }
        tabPanelThree={<></>}
      />
    </>
  );
}
