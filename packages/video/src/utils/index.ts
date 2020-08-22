import isPlainObject from "is-plain-object";

export const isMobile = ((): boolean => {
  if (
    typeof navigator === "undefined" ||
    typeof navigator.userAgent !== "string"
  ) {
    return false;
  }
  return /Mobile/.test(navigator.userAgent);
})();

// This function ensures that the user has granted the browser permission to use audio and video
// devices. If permission has not been granted, it will cause the browser to ask for permission
// for audio and video at the same time (as opposed to separate requests).
export function ensureMediaPermissions(): Promise<void | undefined> {
  return (
    navigator.mediaDevices
      .enumerateDevices()
      .then(devices =>
        devices.every(device => !(device.deviceId && device.label)),
      )
      // eslint-disable-next-line consistent-return
      .then(shouldAskForMediaPermissions => {
        if (shouldAskForMediaPermissions) {
          return navigator.mediaDevices
            .getUserMedia({audio: true, video: true})
            .then(mediaStream =>
              mediaStream.getTracks().forEach(track => track.stop()),
            );
        }
      })
  );
}

// Recursively removes any object keys with a value of undefined
export function removeUndefineds<T>(obj: T): T {
  if (!isPlainObject(obj)) return obj;

  const target: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
  } = {};

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in obj) {
    const val = obj[key];
    if (typeof val !== "undefined") {
      target[key] = removeUndefineds(val);
    }
  }

  return target as T;
}
