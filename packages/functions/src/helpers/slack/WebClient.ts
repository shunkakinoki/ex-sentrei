import {WebClient} from "@slack/web-api";
import * as functions from "firebase-functions";

const config = functions.config().env;

export default new WebClient(config.slack.apiToken);
