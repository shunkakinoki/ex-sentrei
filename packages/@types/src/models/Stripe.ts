import Stripe from "stripe";

export interface Subscription {
  cancel_at_period_end: boolean;
  created: FirebaseFirestore.Timestamp;
  current_period_start: FirebaseFirestore.Timestamp;
  current_period_end: FirebaseFirestore.Timestamp;
  cancel_at: FirebaseFirestore.Timestamp | null;
  canceled_at: FirebaseFirestore.Timestamp | null;
  ended_at: FirebaseFirestore.Timestamp | null;
  price: Stripe.Price;
  prices: Array<Stripe.SubscriptionItem>;
  product: Stripe.Product;
  metadata: {
    [name: string]: string;
  };
  quantity: number;
  role: string | null;
  status:
    | "active"
    | "canceled"
    | "incomplete"
    | "incomplete_expired"
    | "past_due"
    | "trialing"
    | "unpaid";
  stripeLink: string;
  trial_start: FirebaseFirestore.Timestamp | null;
  trial_end: FirebaseFirestore.Timestamp | null;
}
