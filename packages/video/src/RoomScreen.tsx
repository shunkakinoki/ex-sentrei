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
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";
import AppStateProvider from "@sentrei/video/state";
import VideoApp from "@sentrei/video/VideoApp";

export interface Props {
  user: User.Get;
  profile: Profile.Get;
  spaceId: string;
  roomId: string;
}

export default function RoomScreen({
  user,
  profile,
  spaceId,
  roomId,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();

  const [space, setSpace] = React.useState<Space.Get | null | undefined>();
  const [room, setRoom] = React.useState<Room.Get | null | undefined>();
  const [members, setMembers] = React.useState<
    Member.Get[] | null | undefined
  >();

  const [tokenId, setTokenId] = React.useState<string>("");
  const handleTokenId = (token: string): void => setTokenId(token);

  React.useEffect(() => {
    getSpace(spaceId).then(setSpace);
  }, [spaceId]);

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
          snackbar("error", err.message);
        });
    }
  }, [user, room, members, snackbar]);

  if (space === undefined) {
    return <Loader />;
  }

  return (
    <AppStateProvider>
      {profile && room && <VideoApp tokenId={tokenId} />}
    </AppStateProvider>
  );
}