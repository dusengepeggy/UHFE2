import { ToastComponent } from "../Toast";

export const notify = (type, message) => {
    ToastComponent({
      message: message,
      type: type,
    });
  };