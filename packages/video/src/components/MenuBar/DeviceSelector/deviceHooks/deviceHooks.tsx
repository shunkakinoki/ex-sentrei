import {useState, useEffect} from "react";

import {ensureMediaPermissions} from "@sentrei/video/utils";

export function useDevices(): MediaDeviceInfo[] {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const getDevices = (): Promise<void> =>
      ensureMediaPermissions().then(() =>
        navigator.mediaDevices
          .enumerateDevices()
          // eslint-disable-next-line no-shadow
          .then(devices => setDevices(devices)),
      );
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    getDevices();

    return (): void => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
    };
  }, []);

  return devices;
}

export function useAudioInputDevices(): MediaDeviceInfo[] {
  const devices = useDevices();
  return devices.filter(device => device.kind === "audioinput");
}

export function useVideoInputDevices(): MediaDeviceInfo[] {
  const devices = useDevices();
  return devices.filter(device => device.kind === "videoinput");
}

export function useAudioOutputDevices(): MediaDeviceInfo[] {
  const devices = useDevices();
  return devices.filter(device => device.kind === "audiooutput");
}
