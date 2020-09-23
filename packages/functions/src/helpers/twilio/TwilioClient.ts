import * as functions from "firebase-functions";
import twilio from "twilio";
const config = functions.config().env;

const TwilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);

export default TwilioClient;
