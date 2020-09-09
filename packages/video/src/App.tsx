import {styled} from "@material-ui/core/styles";
import React from "react";

import Controls from "@sentrei/video/components/Controls";
import LocalVideoPreview from "@sentrei/video/components/LocalVideoPreview";
import MenuBar from "@sentrei/video/components/MenuBar";
import ReconnectingNotification from "@sentrei/video/components/ReconnectingNotification";
import Room from "@sentrei/video/components/Room";
import useHeight from "@sentrei/video/hooks/useHeight";
import useRoomState from "@sentrei/video/hooks/useRoomState";
import useVideoContext from "@sentrei/video/hooks/useVideoContext";

const Container = styled("div")({
  display: "grid",
  gridTemplateRows: "auto 1fr",
});

const Main = styled("main")({
  overflow: "hidden",
});

export default function App({tokenId}: {tokenId: string}): JSX.Element {
  const roomState = useRoomState();
  const height = useHeight();
  const {connect} = useVideoContext();

  React.useEffect(() => {
    if (tokenId !== "") connect(tokenId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect, tokenId]);

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
