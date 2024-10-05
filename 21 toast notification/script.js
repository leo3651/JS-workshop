import { Toast } from "./Toast.js";

document.querySelector("button").addEventListener("click", () => {
  const toast = new Toast({
    text: "Hello",
    canClose: true,
    position: "top-right",
    autoClose: 7000,
    progressBar: true,
  });
});
