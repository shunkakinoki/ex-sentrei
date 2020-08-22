import mitt from "mitt";

import Emitter from "@sentrei/types/models/Snackbar";

const emitter = mitt();

// eslint-disable-next-line import/prefer-default-export
const SnackbarEmitter: Emitter = {
  off: emitter.off,
  on: emitter.on,
  emit: emitter.emit,
};

export default SnackbarEmitter;
