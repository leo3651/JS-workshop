const listsContainerEl = document.querySelector(".lists");
const addNewListFormEl = document.querySelector(".add-new-list-form");
const addNewTaskFormEl = document.querySelector(".add-new-task-form");
const newListInputEl = document.querySelector(".new-list");
const newTaskInputEl = document.querySelector(".new-task");
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
  const deleteTasksBtn = e.target.closest("[data-delete-tasks]");
  const checkboxEl = e.target.closest(".task input");
  const selectedList = lists.find((list) => list.id === selectedListId);

  if (listsItem) {
    selectedListId = listsItem.dataset.id;
    saveAndRender();
  }

  if (deleteListBtn) {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = null;
    saveAndRender();
  }

  if (checkboxEl) {
    console.log(e.target);
    const task = selectedList.tasks.find((task) => task.id === checkboxEl.id);
    task.completed = !task.completed;
    save();
    renderTasksCount(selectedList);
  }

  if (deleteTasksBtn) {
    selectedList.tasks = selectedList.tasks.filter((task) => !task.completed);
    saveAndRender();
  }
});

addNewListFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const newListName = newListInputEl.value;
  if (!newListName.trim()) return;
  const list = createList(newListName);
  newListInputEl.value = "";
  lists.push(list);
  saveAndRender();
});

addNewTaskFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskName = newTaskInputEl.value;
  if (!newTaskName.trim()) return;
  const task = createTask(newTaskName);
  newTaskInputEl.value = "";
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.tasks.push(task);
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
    renderTasksCount(selectedList);
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
    const checkboxEl = document.getElementById(task.id);
    checkboxEl.checked = task.completed;
  });
}

function renderTasksCount(selectedList) {
  const inCompletedTasks = selectedList.tasks.filter((task) => !task.completed);
  todoListTasksCountEl.textContent = `${inCompletedTasks.length} ${
    inCompletedTasks.length === 1 ? "task" : "tasks"
  } remaining`;
}

function clearElement(htmlEl) {
  htmlEl.innerHTML = "";
}

function createList(listName) {
  return {
    id: Date.now().toString(),
    name: listName,
    tasks: [],
  };
}

function createTask(taskName) {
  return {
    id: Date.now().toString(),
    name: taskName,
    completed: false,
  };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LISTS_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
}

function saveAndRender() {
  save();
  render();
}
