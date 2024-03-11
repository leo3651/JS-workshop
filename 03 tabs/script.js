const tabsContent = document.querySelectorAll(".tab-content");
const allTabs = document.querySelectorAll(".tab");
const tabsContainer = document.querySelector(".tabs");

tabsContainer.addEventListener("click", function (e) {
  const tabToActivate = document.querySelector(e.target.dataset.tab);

  tabsContent.forEach((tab, i) => {
    tab.classList.remove("active");
    allTabs[i].classList.remove("active-tab");
  });

  tabToActivate.classList.add("active");
  e.target.classList.add("active-tab");
});
