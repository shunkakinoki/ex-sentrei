import React from "react";
import {styled} from "@material-ui/core/styles";

import Controls from "@sentrei/video/components/Controls/Controls";
import LocalVideoPreview from "@sentrei/video/components/LocalVideoPreview/LocalVideoPreview";
import MenuBar from "@sentrei/video/components/MenuBar/MenuBar";
import ReconnectingNotification from "@sentrei/video/components/ReconnectingNotification/ReconnectingNotification";
import Room from "@sentrei/video/components/Room/Room";

import useHeight from "@sentrei/video/hooks/useHeight/useHeight";
import useRoomState from "@sentrei/video/hooks/useRoomState/useRoomState";

const Container = styled("div")({
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

const Main = styled("main")({
  overflow: "hidden",
});

export default function App() {
  const roomState = useRoomState();

  // Here we would like the height of the main container to be the height of the viewport.
  // On some mobile browsers, 'height: 100vh' sets the height equal to that of the screen,
  // not the viewport. This looks bad when the mobile browsers location bar is open.
  // We will dynamically set the height with 'window.innerHeight', which means that this
  // will look good on mobile browsers even after the location bar opens or closes.
  const height = useHeight();

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
