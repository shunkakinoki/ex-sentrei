import {styled} from "@material-ui/core/styles";
import React from "react";

import Profile from "@sentrei/types/models/Profile";
import Controls from "@sentrei/video/components/Controls";
import LocalVideoPreview from "@sentrei/video/components/LocalVideoPreview";
import MenuBar from "@sentrei/video/components/MenuBar";
import ReconnectingNotification from "@sentrei/video/components/ReconnectingNotification";
import Room from "@sentrei/video/components/Room";

import useHeight from "@sentrei/video/hooks/useHeight";
import useRoomState from "@sentrei/video/hooks/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";
import {useAppState} from "@sentrei/video/state";

const Container = styled("div")({
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

const Main = styled("main")({
  overflow: "hidden",
});

export default function App({
  tokenId,
  profile,
}: {
  tokenId: string;
  profile: Profile.Get;
}): JSX.Element {
  const roomState = useRoomState();
  const {connect} = useVideoContext();
  const {setProfile} = useAppState();
  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

  setProfile(profile);

  React.useEffect(() => {
    if (tokenId !== "") connect(tokenId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId]);

  return (
    <Container style={{height}}>
      <MenuBar />
      <Main>
        {roomState === "disconnected" ? <LocalVideoPreview /> : <Room />}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </Container>
  );
}
