import { Toast } from "./Toast.js";

const toast = new Toast({
  text: "Hello",
});

setTimeout(() => {
  toast.update({ text: "Bye" });
}, 1000);
