declare namespace Analytics {
  export type Fields = {
    [analytics: string]: FirebaseFirestore.FieldValue | number;
  };

  export type NumberFields = {
    [analytics: string]: number;
  };
}

export default Analytics;
