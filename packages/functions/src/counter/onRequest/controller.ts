import {PubSub} from "@google-cloud/pubsub";
import * as functions from "firebase-functions";

const config = functions.config().env;

export const controller = functions.https.onRequest(
  async (request, response) => {
    let pubsub;
    if (!pubsub) {
      pubsub = new PubSub();
    }
    await pubsub
      .topic(`sentrei-${config.environment}-counter`)
      .publish(Buffer.from(JSON.stringify({})));
    response.status(200).send("Ok");
  },
);

export default controller;
