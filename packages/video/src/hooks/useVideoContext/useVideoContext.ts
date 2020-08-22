import {useContext} from "react";

// eslint-disable-next-line import/no-cycle
import {
  IVideoContext,
  VideoContext,
} from "@sentrei/video/components/VideoProvider";

export default function useVideoContext(): IVideoContext {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
}
