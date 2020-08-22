import mitt from "mitt";

import Emitter from "@sentrei/types/models/Backdrop";

const emitter = mitt();

// eslint-disable-next-line import/prefer-default-export
const BackdropEmitter: Emitter = {
  off: emitter.off,
  on: emitter.on,
  emit: emitter.emit,
};

export default BackdropEmitter;
