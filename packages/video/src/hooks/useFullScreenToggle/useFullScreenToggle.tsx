import fscreen from "fscreen";
import {useCallback, useState, useEffect} from "react";

export default function useFullScreenToggle(): readonly [Boolean, () => void] {
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(
    !!fscreen.fullscreenElement,
  );

  useEffect(() => {
    const onFullScreenChange = (): void =>
      setIsFullScreen(!!fscreen.fullscreenElement);
    fscreen.addEventListener("fullscreenchange", onFullScreenChange);
    return (): void => {
      fscreen.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, []);

  const toggleFullScreen = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isFullScreen
      ? fscreen.exitFullscreen()
      : fscreen.requestFullscreen(document.documentElement);
  }, [isFullScreen]);

  return [isFullScreen, toggleFullScreen] as const;
}
