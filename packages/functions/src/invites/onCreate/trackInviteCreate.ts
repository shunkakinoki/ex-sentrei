import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import Invite from "@sentrei/types/models/Invite";

/**
 * Track invite event on create
 */
const trackInviteCreate = functions.firestore
  .document("spaces/{spaceId}/invites/{inviteId}")
  .onCreate((snap, context) => {
    const {spaceId, inviteId} = context.params;

    const data = snap.data() as Invite.Response;

    trackEvent(data.createdByUid, "Create Invite", {
      inviteId,
      spaceId,
    });
  });

export default trackInviteCreate;
