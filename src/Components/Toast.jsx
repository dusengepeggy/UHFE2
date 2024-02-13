import React from "react"
import toast, { Toaster } from "react-hot-toast";

export const ToastComponent = ({
  message,
  type,
  promise,
  successMessage,
  errorMessage,
}) => {
  let notify;
  switch (type) {
    case "success":
      notify = () => toast.success(message);
      notify();
      break;
    case "error":
      notify = () => toast.error(message);
      notify();
      break;
    case "loading":
      notify = () => toast.loading(message);
      notify();
      break;
    case "multiline":
      notify = () =>
        toast(message, {
          duration: 5000,
        });
      notify();
      break;
    case "promise":
      notify = () =>
        toast.promise(
          promise,
          {
            loading: "Loading",
            success: (data) => `${successMessage}`,
            error: (err) => `${errorMessage}`,
          },
          {
            style: {
              minWidth: "250px",
            },
            success: {
              duration: 5000,
            },
          }
        );
      notify();
      break;
    default:
      notify = () => toast(message);
      notify();
      break;
  }
};

export const ToasterComponent = ({ position = "top-right" }) => {
    return (
      <Toaster
      position={position}
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: "",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },

        // Default options for specific types
        success: {
          duration: 5000,
          style: {
            background: "green",
            color: "#fff", // You might want to adjust the text color for better contrast
          },
        },
        error: {
          duration: 5000,
          style: {
            background: "red",
            color: "#fff", // You might want to adjust the text color for better contrast
          },
        },
      }}
    />
    );
  };