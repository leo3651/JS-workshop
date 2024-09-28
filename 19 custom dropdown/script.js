import Select from "./select.js";

const selectElems = document.querySelectorAll("[data-custom]");
selectElems.forEach((selectEl) => console.log(new Select(selectEl)));
