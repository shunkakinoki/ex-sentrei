import {useEffect, useState} from "react";

import useVideoContext from "@sentrei/video/hooks/useVideoContext";

type RoomStateType = "disconnected" | "connected" | "reconnecting";

export default function useRoomState(): RoomStateType {
  const {room} = useVideoContext();
  const [state, setState] = useState<RoomStateType>("disconnected");

  useEffect(() => {
    const setRoomState = (): void =>
      setState((room.state || "disconnected") as RoomStateType);
    setRoomState();
    room
      .on("disconnected", setRoomState)
      .on("reconnected", setRoomState)
      .on("reconnecting", setRoomState);
    return (): void => {
      room
        .off("disconnected", setRoomState)
        .off("reconnected", setRoomState)
        .off("reconnecting", setRoomState);
    };
  }, [room]);

  return state;
}
