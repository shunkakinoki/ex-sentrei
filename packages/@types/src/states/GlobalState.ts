import BackdropEmitter from "@sentrei/types/models/Backdrop";
import SnackbarEmitter from "@sentrei/types/models/Snackbar";

export default interface GlobalState {
  backdrop: BackdropEmitter;
  snackbar: SnackbarEmitter;
}
