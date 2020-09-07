import Stripe from "stripe";

import Metadata from "@sentrei/types/models/Metadata";

declare namespace Space {
  export type Tiers = "free" | "pro" | "enterprise";

  export type EditableFields = {
    description: string | null;
    name: string;
    photo: string | null;
    photoHash: string | null;
  };

  interface Fields extends EditableFields {
    memberCount: FirebaseFirestore.FieldValue | number;
    namespaceId: string;
    roomCount: FirebaseFirestore.FieldValue | number;
    stripeId: string;
    subscriptionId?: string;
    subscriptionStatus?: Stripe.Subscription.Status;
    subscriptionTrial?: boolean;
    tier: Tiers;
  }

  export type AdminUpdate = Partial<Fields>;

  export interface Create extends Fields, Metadata.Create {}

  export interface Update extends Partial<EditableFields>, Metadata.Update {}

  export interface Response extends Fields, Metadata.Response {}

  export interface Get extends Fields, Metadata.Get {
    id: string;
    memberCount: number;
    roomCount: number;
  }

  export interface Snapshot extends Get {
    snap: firebase.firestore.DocumentSnapshot;
  }
}

export default Space;
