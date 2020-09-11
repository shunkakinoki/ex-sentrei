import * as React from "react";

import {updateMember} from "@sentrei/common/firebase/members";
import {timestamp} from "@sentrei/common/utils/firebase";
import {trackEvent} from "@sentrei/common/utils/segment";
import Profile from "@sentrei/types/models/Profile";
import EmojiPicker from "@sentrei/ui/components/EmojiPicker";
import useSnackbar from "@sentrei/ui/hooks/useSnackbar";

export interface Props {
  emoji: string;
  profile: Profile.Get;
  spaceId: string;
  userId: string;
}

export default function SpacePanelEmojiPicker({
  emoji,
  profile,
  spaceId,
  userId,
}: Props): JSX.Element {
  const {snackbar} = useSnackbar();

  const handleEmoji = async (emojiString: string): Promise<void> => {
    try {
      await updateMember(spaceId, userId, {
        emoji: emojiString,
        updatedAt: timestamp,
        updatedBy: profile,
        updatedByUid: userId,
      }).then(() => {
        trackEvent("Update Member Emoji");
      });
    } catch (err) {
      snackbar("error", err.message);
    }
  };

  return <EmojiPicker emoji={emoji} onSelect={handleEmoji} />;
}
