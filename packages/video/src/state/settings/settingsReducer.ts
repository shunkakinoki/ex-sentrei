import {Track, VideoBandwidthProfileOptions} from "twilio-video";

import {isMobile} from "@sentrei/video/utils";

import {RenderDimensionValue} from "./renderDimensions";

export interface Settings {
  trackSwitchOffMode: VideoBandwidthProfileOptions["trackSwitchOffMode"];
  dominantSpeakerPriority?: Track.Priority;
  bandwidthProfileMode: VideoBandwidthProfileOptions["mode"];
  maxTracks: string;
  maxAudioBitrate: string;
  renderDimensionLow?: RenderDimensionValue;
  renderDimensionStandard?: RenderDimensionValue;
  renderDimensionHigh?: RenderDimensionValue;
}

type SettingsKeys = keyof Settings;

export interface SettingsAction {
  name: SettingsKeys;
  value: string;
}

export const initialSettings: Settings = {
  trackSwitchOffMode: undefined,
  dominantSpeakerPriority: "standard",
  bandwidthProfileMode: "collaboration",
  maxTracks: isMobile ? "5" : "10",
  maxAudioBitrate: "16000",
  renderDimensionLow: "low",
  renderDimensionStandard: "960p",
  renderDimensionHigh: "wide1080p",
};

// This inputLabels object is used by ConnectionOptions.tsx. It is used to populate the id, name, and label props
// of the various input elements. Using a typed object like this (instead of strings) eliminates the possibility
// of there being a typo.
export const inputLabels = ((): {
  trackSwitchOffMode: string;
  dominantSpeakerPriority: string;
  bandwidthProfileMode: string;
  maxTracks: string;
  maxAudioBitrate: string;
  renderDimensionLow: string;
  renderDimensionStandard: string;
  renderDimensionHigh: string;
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = {};
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const setting in initialSettings) {
    target[setting] = setting as SettingsKeys;
  }
  return target as {[key in SettingsKeys]: string};
})();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function settingsReducer(state: Settings, action: SettingsAction) {
  return {
    ...state,
    [action.name]: action.value === "default" ? undefined : action.value,
  };
}
