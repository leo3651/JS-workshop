import Select from "./Select.js";

const selectElems = document.querySelectorAll("[data-custom]");
selectElems.forEach((selectEl) => console.log(new Select(selectEl)));
