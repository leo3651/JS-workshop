const modal = document.querySelector(".modal");
const openmodalBtn = document.querySelector(".open-modal-btn");
const btnClosemodal = document.querySelector(".exit-btn");
const overlay = document.querySelector(".overlay");

openmodalBtn.addEventListener("click", openModal);

btnClosemodal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

window.addEventListener("keydown", function (e) {
  e.key === "Escape" && overlay.classList.contains("show") && closeModal();
});

function openModal() {
  modal.classList.add("open");
  overlay.classList.add("show");
}

function closeModal() {
  modal.classList.remove("open");
  overlay.classList.remove("show");
}
