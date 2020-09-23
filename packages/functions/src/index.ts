/* eslint-disable import/prefer-default-export */
/* eslint-disable import/first */

import * as admin from "firebase-admin";

admin.initializeApp();

import * as actions from "./actions";
import * as activity from "./activity";
import * as analytics from "./analytics";
// import * as counter from "./counter";
import * as feedback from "./feedback";
import * as invites from "./invites";
import * as members from "./members";
import * as metrics from "./metrics";
import * as namerooms from "./namerooms";
import * as namespaces from "./namespaces";
import * as notifications from "./notifications";
import * as participants from "./participants";
import * as profiles from "./profiles";
import * as rooms from "./rooms";
import * as sendgrid from "./sendgrid";
import * as sessions from "./sessions";
import * as slack from "./slack";
import * as spaces from "./spaces";
import * as stats from "./stats";
import * as status from "./status";
import * as stripe from "./stripe";
import * as twilio from "./twilio";
import * as users from "./users";

const v1 = {
  actions,
  activity,
  analytics,
  // counter,
  feedback,
  invites,
  members,
  metrics,
  namerooms,
  namespaces,
  notifications,
  participants,
  profiles,
  rooms,
  sendgrid,
  sessions,
  slack,
  spaces,
  stats,
  status,
  stripe,
  twilio,
  users,
};

export {v1};
