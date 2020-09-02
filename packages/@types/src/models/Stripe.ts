export interface Price {
  active: boolean;
  description: string | null;
  currency: string;
  interval: "day" | "month" | "week" | "year" | null;
  interval_count: number | null;
  trial_period_days: number | null;
  unit_amount: number;
  type: "one_time" | "recurring";
}

export interface Product {
  active: boolean;
  description: string | null;
  images: Array<string>;
  name: string;
  prices?: Array<Price>;
  role: string | null;
}

export interface Subscription {
  cancel_at_period_end: boolean;
  created: FirebaseFirestore.Timestamp;
  current_period_start: FirebaseFirestore.Timestamp;
  current_period_end: FirebaseFirestore.Timestamp;
  cancel_at: FirebaseFirestore.Timestamp | null;
  canceled_at: FirebaseFirestore.Timestamp | null;
  ended_at: FirebaseFirestore.Timestamp | null;
  price: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  prices: Array<
    FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
  >;
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
