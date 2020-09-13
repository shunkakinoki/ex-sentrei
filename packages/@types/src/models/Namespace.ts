export type NamespaceModel = "space" | "user";

export default interface Namespace {
  uid: string;
  model: NamespaceModel;
}
