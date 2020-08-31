import Error from "next/error";
import * as React from "react";

import {getMembers} from "@sentrei/common/firebase/members";
import {getRoom} from "@sentrei/common/firebase/rooms";
import {getSpace} from "@sentrei/common/firebase/spaces";
import issueRoomToken from "@sentrei/common/services/issueRoomToken";
import Member from "@sentrei/types/models/Member";
import Profile from "@sentrei/types/models/Profile";
import Room from "@sentrei/types/models/Room";
import Space from "@sentrei/types/models/Space";
import User from "@sentrei/types/models/User";
import Loader from "@sentrei/ui/components/Loader";
import VideoScreen from "@sentrei/ui/components/VideoScreen";
import AppStateProvider from "@sentrei/video/state";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  namespaceId: string;
  roomId: string;
}

export default function RoomScreen({
  user,
  profile,
  namespaceId,
  roomId,
}: Props): JSX.Element {
  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  const [tokenId, setTokenId] = React.useState<string>("");
  const handleTokenId = (token: string): void => setTokenId(token);

  React.useEffect(() => {
    getSpace(namespaceId).then(setSpace);
  }, [namespaceId]);

  React.useEffect(() => {
    getRoom(roomId).then(setRoom);
  }, [roomId]);

  React.useEffect(() => {
    if (space?.id) {
      getMembers({spaceId: space?.id}).then(setMembers);
    }
  }, [space]);

  React.useEffect(() => {
    // TODO: Validate if members in space
    if (user && room && members) {
      issueRoomToken(room.id)
        .then((token): void => {
          handleTokenId(token);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
  }, [user, room, members]);

  if (space === undefined) {
    return <Loader />;
  }

  if (!space) {
    return <Error statusCode={404} />;
  }

  return (
    <AppStateProvider>
      {profile && room && <VideoScreen tokenId={tokenId} profile={profile} />}
    </AppStateProvider>
  );
}
