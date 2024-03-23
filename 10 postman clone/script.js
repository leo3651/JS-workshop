import axios from "axios";
import prettyBytes from "pretty-bytes";
import setupEditors from "./setupEditor";

//////////////////////////////
/////// tabs functionality
//////////////////////////////
const tabsContainer = document.querySelector(".tabs-container");
const tabsContainerResponse = document.querySelector(
  ".tabs-container-response"
);

tabsContainer.addEventListener("click", switchTabs);
tabsContainerResponse.addEventListener("click", switchTabs);

function switchTabs(e) {
  const tab = e.target.closest(".list-item");
  const tabContent = document.getElementById(
    e.target.closest(".list-item")?.dataset.tabContent
  );

  if (!tab) return;
  if (!tabContent) return;

  const tabs = e.currentTarget.querySelectorAll(".list-item");
  const tabContents = e.currentTarget.querySelectorAll(".results");

  tabs.forEach((tab, index) => {
    tab.classList.remove("active-tab");
    tabContents[index].classList.remove("active-tab-content");
  });

  tab.classList.add("active-tab");
  tabContent.classList.add("active-tab-content");
}

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
const responseContainer = document.querySelector(".response");
const form = document.querySelector("[data-form]");
const url = document.querySelector("[data-url]");
const method = document.querySelector("[data-method]");
const responseHeadersContent = document.getElementById(
  "response-headers-content"
);

axios.interceptors.request.use((request) => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  console.log(request);
  return request;
});

axios.interceptors.response.use(updateEndTime, (e) =>
  Promise.reject(updateEndTime(e.response))
);

const { requestEditor, updateResponseEditor } = setupEditors();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!url.value) return;
  responseContainer.classList.remove("hide");

  let data;
  try {
    data = JSON.parse(requestEditor.state.doc.toString()) || null;
  } catch (err) {
    alert("JSON malformed");
    return;
  }

  axios({
    url: url.value,
    method: method.value,
    params: keyValuePairsToObject(queryParamsContent),
    headers: keyValuePairsToObject(headersContent),
    data,
  })
    .catch((err) => err)
    .then((response) => {
      updateResponseDetails(response);
      updateResponseHeaders(response.headers);
      updateResponseEditor(response.data);
    });
});

function updateResponseHeaders(headers) {
  responseHeadersContent.innerHTML = "";

  Object.entries(headers).forEach(([key, value]) => {
    const keyElement = document.createElement("div");
    keyElement.textContent = key;

    const valueElement = document.createElement("div");
    valueElement.textContent = value;

    responseHeadersContent.append(keyElement);
    responseHeadersContent.append(valueElement);
  });
}

function updateResponseDetails(response) {
  document.querySelector("[data-status]").textContent = response.status;
  document.querySelector("[data-time]").textContent =
    response.customData.timePassed;
  document.querySelector("[data-size]").textContent = prettyBytes(
    JSON.stringify(response.data).length +
      JSON.stringify(response.headers).length
  );
}

function keyValuePairsToObject(contentContainer) {
  const pairs = contentContainer.querySelectorAll(".key-value-pairs");

  return [...pairs].reduce((acc, pair) => {
    const key = pair.querySelector(".key-input").value;
    const value = pair.querySelector(".value-input").value;

    if (!key) return acc;
    return { ...acc, [key]: value };
  }, {});
}

function updateEndTime(response) {
  console.log(response);
  response.customData = response.customData || {};
  response.customData.timePassed =
    new Date().getTime() - response.config.customData.startTime;
  return response;
}
