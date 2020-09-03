export type NamespaceType = "space" | "user";

export default interface Namespace {
  uid: string;
  type: NamespaceType;
}
