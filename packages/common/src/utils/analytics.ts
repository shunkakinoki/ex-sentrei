import {analytics} from "@sentrei/common/utils/firebase";

export interface TrackEvent {
  action: string;
  category?: string;
  label?: string;
  value: string | number;
  uid?: string;
}

export const setUserID = (uid?: string): void => {
  if (!uid) return;
  analytics().setUserId(uid);
};

export const pageView = (url: string, uid?: string): void => {
  setUserID(uid);
  analytics().logEvent("page_view", {page_path: url});
};
