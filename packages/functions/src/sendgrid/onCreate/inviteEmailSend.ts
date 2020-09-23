import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import InviteEmail from "@sentrei/functions/helpers/sendgrid/InviteEmail";
import MailClient from "@sentrei/functions/helpers/sendgrid/MailClient";

import Email from "@sentrei/types/models/Email";
import Invite from "@sentrei/types/models/Invite";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

const inviteEmailSend = functions.firestore
  .document("{collection}/{docId}/invites/{inviteId}")
  .onCreate(async snap => {
    const data = snap.data() as Invite.Response;

    const user = await db.doc(`users/${data.createdByUid}`).get();
    const userData = user.data() as User.Response;

    trackEvent(data.createdByUid, "Send Invite Email");

    if (data.method !== "email") {
      return false;
    }

    const email = new InviteEmail({
      link: `${data.window}/${data.spaceId}/invite/${snap.id}`,
      name: data.email,
      sender: data.createdBy.name,
      space: data.spaceId,
    });

    const language = userData?.language || "en";

    const msg: Email.SendGrid = {
      to: data.email,
      from: "support@sentrei.com",
      subject: email.subject(language),
      text: email.text(language),
      html: email.html(language),
    };

    return MailClient.send(msg);
  });

export default inviteEmailSend;
