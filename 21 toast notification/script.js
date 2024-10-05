import { Toast } from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello",
    autoClose: false,
    canClose: true,
    position: "top-right",
  });
});
