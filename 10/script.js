// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
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
