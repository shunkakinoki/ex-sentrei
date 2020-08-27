declare namespace Analytics {
  export type Fields = {
    [analytics: string]: FirebaseFirestore.FieldValue | number;
  };
}

export default Analytics;
