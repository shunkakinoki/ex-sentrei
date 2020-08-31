import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import useTranslation from "next-translate/useTranslation";
import Error from "next/error";
import * as React from "react";

import {getSpace} from "@sentrei/common/firebase/spaces";
import Profile from "@sentrei/types/models/Profile";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import FormSection from "@sentrei/ui/components/FormSection";
import RoomStepperCreate from "@sentrei/ui/components/RoomStepperCreate";
import SkeletonForm from "@sentrei/ui/components/SkeletonForm";

export interface Props {
  profile: Profile.Get;
  namespaceId: string;
  user: User.Get;
}

export default function RoomCreate({
  profile,
  namespaceId,
  user,
}: Props): JSX.Element {
  const {t} = useTranslation();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();

  React.useEffect(() => {
    getSpace(namespaceId).then(setSpace);
  }, [namespaceId]);

  if (space === undefined) {
    return <SkeletonForm />;
  }

  if (space === null) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <FormSection
        icon={<AddToPhotosIcon />}
        title={t("room:room.createRoom")}
      />
      <RoomStepperCreate
        profile={profile}
        user={user}
        namespaceId={namespaceId}
      />
    </>
  );
}
