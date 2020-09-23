import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import trackEvent from "@sentrei/functions/helpers/segment/trackEvent";
import MailClient from "@sentrei/functions/helpers/sendgrid/MailClient";
import UpdateEmail from "@sentrei/functions/helpers/sendgrid/UpdateEmail";
import Email from "@sentrei/types/models/Email";
import Notification from "@sentrei/types/models/Notification";
import User from "@sentrei/types/models/User";

const db = admin.firestore();

const notificationEmailSend = functions.firestore
  .document("users/{userId}/notifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const {userId} = context.params;
    const data = snap.data() as Notification.Response;

    const user = await db.doc(`users/${userId}`).get();
    const userData = user.data() as User.Response;

    trackEvent(userId, "Send Notification Email");

    const isEnabled = userData.notificationSettings[data.type].includes(
      "email",
    );

    if (!isEnabled || !userData.email) return false;

    const email = new UpdateEmail({
      editId: data.activityId || data.itemPath,
      name: data.user.name,
    });

    const language = userData?.language || "en";

    const msg: Email.SendGrid = {
      to: userData.email,
      from: "support@sentrei.com",
      subject: email.subject(language),
      text: email.text(language),
      html: email.html(language),
    };

    return MailClient.send(msg);
  });

export default notificationEmailSend;
