export type BackdropAction = "loading" | "dismiss";

export type Handler = (event?: string) => void;
export type WildcardHandler = (type: BackdropAction, event?: string) => void;

export default interface Emitter {
  on(action: BackdropAction, handler: Handler): void;
  on(action: "*", handler: WildcardHandler): void;

  off(action: BackdropAction, handler: Handler): void;
  off(action: "*", handler: WildcardHandler): void;

  emit(action: BackdropAction): void;
}
