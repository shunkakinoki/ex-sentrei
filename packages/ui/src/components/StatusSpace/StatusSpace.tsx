import * as React from "react";

import {updateStatus} from "@sentrei/common/firebase/status";
import Profile from "@sentrei/types/models/Profile";

export interface Props {
  profile: Profile.Get;
  userId: string;
}

function getVisibility(): true | "hidden" | "visible" {
  if (typeof document === "undefined") return true;
  return document.visibilityState;
}

function useDocumentVisibility(): true | "hidden" | "visible" {
  const [documentVisibility, setDocumentVisibility] = React.useState(
    getVisibility(),
  );

  function handleVisibilityChange(): void {
    setDocumentVisibility(getVisibility());
  }

  React.useEffect(() => {
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return (): void => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return documentVisibility;
}

export default function StatusSpace({userId, profile}: Props): JSX.Element {
  const documentVisibility = useDocumentVisibility();

  React.useEffect(() => {
    if (documentVisibility === "hidden") {
      updateStatus(userId, profile, true);
    } else {
      updateStatus(userId, profile, false);
    }
  }, [documentVisibility, profile, userId]);

  return <></>;
}
