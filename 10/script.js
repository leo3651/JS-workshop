import axios from "axios";

//////////////////////////////
/////// tabs functionality
//////////////////////////////
const tabsContainer = document.querySelector(".list");
const tabs = document.querySelectorAll(".list-item");
const tabContents = document.querySelectorAll(".results");

tabsContainer.addEventListener("click", (e) => {
  const tab = e.target.closest(".list-item");
  const tabContent = document.getElementById(
    e.target.closest(".list-item").dataset.tabContent
  );
  if (!tab) return;

  tabs.forEach((tab, index) => {
    tab.classList.remove("active-tab");
    tabContents[index].classList.remove("active-tab-content");
  });

  tab.classList.add("active-tab");
  tabContent.classList.add("active-tab-content");
});

//////////////////////////////
/////// key value pairs functionality
//////////////////////////////
const queryParamsContent = document.getElementById("query-params-content");
const headersContent = document.getElementById("headers-content");
const templateKeyValue = document.querySelector("template");
const addBtns = document.querySelectorAll(".success");

createKeyValuePair(queryParamsContent);
createKeyValuePair(headersContent);

addBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    createKeyValuePair(
      e.target.closest(".active-tab-content").firstElementChild
    );
  })
);

function createKeyValuePair(element) {
  const newKeyValuePair = templateKeyValue.content.cloneNode(true);
  newKeyValuePair
    .querySelector(".danger")
    .addEventListener("click", (e) =>
      e.target.closest(".key-value-pairs").remove()
    );
  element.append(newKeyValuePair);
}

//////////////////////////////
/////// axios
//////////////////////////////
const form = document.querySelector("[data-form]");
const url = document.querySelector("[data-url]");
const method = document.querySelector("[data-method]");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios({
    url: url.value,
    method: method.value,
    params: "",
    headers: "",
  });
});
