import MailClient from "@sendgrid/mail";
import * as functions from "firebase-functions";

const config = functions.config().env;

MailClient.setApiKey(config.sendgrid.apiKey);

export default MailClient;
