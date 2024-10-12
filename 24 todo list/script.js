const listsContainerEl = document.querySelector(".lists");
const addNewListFormEl = document.querySelector(".add-new-list-form");
const newListInputEl = document.querySelector(".new-list");
const todoListEl = document.querySelector(".todo-list");
const todoListTitleEl = document.querySelector(".todo-list-title");
const todoListTasksCountEl = document.querySelector(".tasks-count");
const todoListTasksContEl = document.querySelector(".tasks");

const LOCAL_STORAGE_LISTS_KEY = "todo.lists";
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "todo.selectedList";
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LISTS_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

render();

document.addEventListener("click", (e) => {
  const listsItem = e.target.closest(".lists-item");
  const deleteListBtn = e.target.closest("[data-delete-list]");

  if (listsItem) {
    selectedListId = listsItem.dataset.id;
    saveAndRender();
  }

  if (deleteListBtn) {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
  }
});

addNewListFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = newListInputEl.value;
  if (!newListName.trim()) return;
  console.log(newListName);
  const list = createList(newListName);
  newListInputEl.value = "";
  lists.push(list);
  saveAndRender();
});

function render() {
  clearElement(listsContainerEl);
  clearElement(todoListTasksContEl);
  renderLists();
  const selectedList = lists.find((list) => list.id === selectedListId);

  if (selectedListId === null || selectedListId === "null") {
    todoListEl.style.display = "none";
  } else {
    todoListEl.style.display = "";
    todoListTitleEl.textContent = selectedList.name;
    todoListTasksCountEl.textContent = renderTasksCount(selectedList);
    renderTasks(selectedList);
  }
}

function renderLists() {
  lists.forEach((list) => {
    const listEl = document.createElement("li");
    listEl.dataset.id = list.id;
    listEl.classList.add("lists-item");
    listEl.textContent = list.name;
    listsContainerEl.append(listEl);
    if (list.id === selectedListId) {
      listEl.classList.add("active");
    }
  });
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach((task) => {
    const taskEl = `          
    <div class="task">
      <input id="${task.id}" type="checkbox" value="Write code" />
      <label for="${task.id}">
        <span class="custom-checkbox"></span>${task.name}
      </label>
    </div>`;
    todoListTasksContEl.insertAdjacentHTML("afterbegin", taskEl);
  });
}

function renderTasksCount(selectedList) {
  const completedTasks = selectedList.tasks.filter((task) => task.completed);
  return `${completedTasks.length} ${
    completedTasks.length === 1 ? "task" : "tasks"
  } remaining`;
}

function clearElement(htmlEl) {
  htmlEl.innerHTML = "";
}

function createList(listName) {
  return { id: Date.now().toString(), name: listName, tasks: [] };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}
