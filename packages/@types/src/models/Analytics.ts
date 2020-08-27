declare namespace Analytics {
  export type Fields = {
    [s: string]: FirebaseFirestore.FieldValue | number;
  };
}

export default Analytics;
